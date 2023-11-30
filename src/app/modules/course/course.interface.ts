export type ICourseEnrollmentStatus = 'Open' | 'Closed' | 'In Progress';

export type ICourse = {
  id?: string;
  name: string;
  instructor: string;
  description: string;
  enrollmentStatus?: ICourseEnrollmentStatus;
  thumbnail: string;
  duration: string;
  schedule: string;
  location: string;
  prerequisites: string[];
  syllabus: {
    week: number;
    topic: string;
    content: string;
  }[];
  students: {
    id: number;
    name: string;
    email: string;
  }[];
};

export type ICourseFilters = {
  searchTerm?: string;
  enrollmentStatus?: ICourseEnrollmentStatus;
};
