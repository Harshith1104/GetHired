export const APPLICATION_STATUSES = [
  'Applied',
  'Shortlisted',
  'Interview',
  'Offer',
  'Rejected'
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const DEFAULT_APPLICATION_STATUS: ApplicationStatus = 'Applied';
