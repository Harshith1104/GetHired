import { Test } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService]
    }).compile();

    controller = moduleRef.get(AppController);
  });

  it('returns API information for the root endpoint', () => {
    expect(controller.getApiInfo()).toEqual({
      success: true,
      message: 'GetHired API is running.',
      data: {
        project: 'GetHired',
        description: 'Placement and Job Application Tracker',
        endpoints: {
          applications: '/applications',
          dashboard: '/dashboard/stats'
        }
      }
    });
  });
});
