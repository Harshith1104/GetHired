import { Injectable } from '@nestjs/common';
import { ApplicationsService } from '../applications/applications.service';

@Injectable()
export class DashboardService {
  constructor(private readonly applicationsService: ApplicationsService) {}

  async getDashboardStats() {
    return this.applicationsService.getStats();
  }
}
