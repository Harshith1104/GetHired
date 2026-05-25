import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';
import {
  APPLICATION_STATUSES,
  ApplicationStatus
} from '../../../common/constants/application-status.constant';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  jobRole: string;

  @IsIn(APPLICATION_STATUSES)
  @IsOptional()
  status?: ApplicationStatus;

  @IsDateString()
  @IsOptional()
  appliedDate?: string | null;

  @IsDateString()
  @IsOptional()
  deadlineDate?: string | null;

  @IsString()
  @IsOptional()
  resumeVersion?: string | null;

  @IsString()
  @IsOptional()
  location?: string | null;

  @IsString()
  @IsOptional()
  packageOffered?: string | null;

  @IsString()
  @IsOptional()
  notes?: string | null;

  @IsBoolean()
  @IsOptional()
  isDreamCompany?: boolean;
}
