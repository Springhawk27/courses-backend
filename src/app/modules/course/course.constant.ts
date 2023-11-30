import { ICourseEnrollmentStatus } from './course.interface';

export const courseSearchableFields = [
  'name',
  'instructor',
  'enrollmentStatus',
];

export const courseFilterableFields = [
  'searchTerm',
  'name',
  'instructor',
  'enrollmentStatus',
];

export const status: ICourseEnrollmentStatus[] = [
  'Open',
  'Closed',
  'In Progress',
];
