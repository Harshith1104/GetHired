import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import {
  APPLICATION_STATUSES,
  ApplicationStatus,
  DEFAULT_APPLICATION_STATUS
} from '../../common/constants/application-status.constant';
import { createMessageResponse } from '../../common/utils/response.util';
import { databasePool } from '../../data/database';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

interface ApplicationRow extends RowDataPacket {
  id: number;
  companyName: string;
  jobRole: string;
  status: ApplicationStatus;
  appliedDate: string | null;
  deadlineDate: string | null;
  resumeVersion: string | null;
  location: string | null;
  packageOffered: string | null;
  notes: string | null;
  isDreamCompany: number | boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface StatsRow extends RowDataPacket {
  total: number | string;
  applied: number | string;
  shortlisted: number | string;
  interview: number | string;
  offer: number | string;
  rejected: number | string;
  dreamCompanies: number | string;
}

@Injectable()
export class ApplicationsService {
  async create(dto: CreateApplicationDto) {
    const [result] = await databasePool.execute<ResultSetHeader>(
      `INSERT INTO applications
        (companyName, jobRole, status, appliedDate, deadlineDate, resumeVersion,
          location, packageOffered, notes, isDreamCompany)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        dto.companyName.trim(),
        dto.jobRole.trim(),
        dto.status || DEFAULT_APPLICATION_STATUS,
        dto.appliedDate || null,
        dto.deadlineDate || null,
        this.cleanOptionalText(dto.resumeVersion),
        this.cleanOptionalText(dto.location),
        this.cleanOptionalText(dto.packageOffered),
        this.cleanOptionalText(dto.notes),
        dto.isDreamCompany ? 1 : 0
      ]
    );

    return this.findOne(result.insertId);
  }

  async findAll(status?: ApplicationStatus, search?: string) {
    const conditions: string[] = [];
    const parameters: string[] = [];

    if (status) {
      if (!APPLICATION_STATUSES.includes(status)) {
        throw new BadRequestException('Invalid application status filter');
      }

      conditions.push('status = ?');
      parameters.push(status);
    }

    if (search?.trim()) {
      const term = `%${search.trim()}%`;
      conditions.push(
        '(companyName LIKE ? OR jobRole LIKE ? OR location LIKE ?)'
      );
      parameters.push(term, term, term);
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(' AND ')}`
      : '';
    const [rows] = await databasePool.execute<ApplicationRow[]>(
      `SELECT * FROM applications ${whereClause} ORDER BY createdAt DESC`,
      parameters
    );

    return rows.map((application) => this.formatApplication(application));
  }

  async findOne(id: number) {
    const [rows] = await databasePool.execute<ApplicationRow[]>(
      'SELECT * FROM applications WHERE id = ? LIMIT 1',
      [id]
    );
    const application = rows[0];

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    return this.formatApplication(application);
  }

  async update(id: number, dto: UpdateApplicationDto) {
    await this.findOne(id);

    const fields: string[] = [];
    const values: Array<string | number | null> = [];
    const addField = (field: string, value: string | number | null) => {
      fields.push(`${field} = ?`);
      values.push(value);
    };

    if (dto.companyName !== undefined) {
      addField('companyName', dto.companyName.trim());
    }
    if (dto.jobRole !== undefined) {
      addField('jobRole', dto.jobRole.trim());
    }
    if (dto.status !== undefined) {
      addField('status', dto.status);
    }
    if (dto.appliedDate !== undefined) {
      addField('appliedDate', dto.appliedDate || null);
    }
    if (dto.deadlineDate !== undefined) {
      addField('deadlineDate', dto.deadlineDate || null);
    }
    if (dto.resumeVersion !== undefined) {
      addField('resumeVersion', this.cleanOptionalText(dto.resumeVersion));
    }
    if (dto.location !== undefined) {
      addField('location', this.cleanOptionalText(dto.location));
    }
    if (dto.packageOffered !== undefined) {
      addField('packageOffered', this.cleanOptionalText(dto.packageOffered));
    }
    if (dto.notes !== undefined) {
      addField('notes', this.cleanOptionalText(dto.notes));
    }
    if (dto.isDreamCompany !== undefined) {
      addField('isDreamCompany', dto.isDreamCompany ? 1 : 0);
    }

    if (fields.length) {
      values.push(id);
      await databasePool.execute<ResultSetHeader>(
        `UPDATE applications SET ${fields.join(', ')} WHERE id = ?`,
        values
      );
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await databasePool.execute<ResultSetHeader>(
      'DELETE FROM applications WHERE id = ?',
      [id]
    );

    return createMessageResponse('Application deleted successfully.');
  }

  async getStats() {
    const [summaryRows] = await databasePool.execute<StatsRow[]>(
      `SELECT
        COUNT(*) AS total,
        SUM(status = 'Applied') AS applied,
        SUM(status = 'Shortlisted') AS shortlisted,
        SUM(status = 'Interview') AS interview,
        SUM(status = 'Offer') AS offer,
        SUM(status = 'Rejected') AS rejected,
        SUM(isDreamCompany = TRUE) AS dreamCompanies
       FROM applications`
    );
    const summary = summaryRows[0];
    const [deadlineRows] = await databasePool.execute<ApplicationRow[]>(
      `SELECT * FROM applications
       WHERE deadlineDate IS NOT NULL AND deadlineDate >= CURDATE()
       ORDER BY deadlineDate ASC
       LIMIT 5`
    );

    return {
      total: Number(summary.total),
      applied: Number(summary.applied || 0),
      shortlisted: Number(summary.shortlisted || 0),
      interview: Number(summary.interview || 0),
      offer: Number(summary.offer || 0),
      rejected: Number(summary.rejected || 0),
      dreamCompanies: Number(summary.dreamCompanies || 0),
      upcomingDeadlines: deadlineRows.map((application) =>
        this.formatApplication(application)
      )
    };
  }

  private cleanOptionalText(value?: string | null): string | null {
    if (!value?.trim()) {
      return null;
    }

    return value.trim();
  }

  private formatApplication(application: ApplicationRow) {
    return {
      ...application,
      isDreamCompany: Boolean(application.isDreamCompany)
    };
  }
}
