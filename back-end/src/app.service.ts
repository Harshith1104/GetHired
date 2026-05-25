import { Injectable } from '@nestjs/common';
import { createSuccessResponse } from './common/utils/response.util';

@Injectable()
export class AppService {
  getApiInfo() {
    return createSuccessResponse('GetHired API is running.', {
      project: 'GetHired',
      description: 'Placement and Job Application Tracker',
      endpoints: {
        applications: '/applications',
        dashboard: '/dashboard/stats'
      }
    });
  }
}
