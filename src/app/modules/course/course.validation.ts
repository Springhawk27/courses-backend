import { z } from 'zod';
import { ICourseEnrollmentStatus } from './course.interface';

const createCourseZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    instructor: z.string({
      required_error: 'Instructor is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    enrollmentStatus: z
      .string({
        required_error: 'Enrollment Status is required',
      })
      .refine(value =>
        ['Open', 'Closed', 'In Progress'].includes(
          value as ICourseEnrollmentStatus,
        ),
      ),
    thumbnail: z.string({
      required_error: 'Thumbnail is required',
    }),
    duration: z.string({
      required_error: 'Duration is required',
    }),
    schedule: z.string({
      required_error: 'Schedule is required',
    }),
    location: z.string({
      required_error: 'Location is required',
    }),
    prerequisites: z.array(z.string()).refine(value => value.length >= 0, {
      message: 'At least one prerequisite is required',
    }),
    syllabus: z.array(
      z.object({
        week: z.number(),
        topic: z.string(),
        content: z.string(),
      }),
    ),
    students: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email(),
      }),
    ),
  }),
});

const updateCourseZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .optional(),
    instructor: z
      .string({
        required_error: 'Instructor is required',
      })
      .optional(),
    description: z
      .string({
        required_error: 'Description is required',
      })
      .optional(),
    enrollmentStatus: z
      .string({
        required_error: 'Enrollment Status is required',
        // Assuming ICourseEnrollmentStatus is an enum, you can use `refine` to check against its values
      })
      .refine(value =>
        ['Open', 'Closed', 'In Progress'].includes(
          value as ICourseEnrollmentStatus,
        ),
      )
      .optional(),
    thumbnail: z
      .string({
        required_error: 'Thumbnail is required',
      })
      .optional(),
    duration: z
      .string({
        required_error: 'Duration is required',
      })
      .optional(),
    schedule: z
      .string({
        required_error: 'Schedule is required',
      })
      .optional(),
    location: z
      .string({
        required_error: 'Location is required',
      })
      .optional(),
    prerequisites: z
      .array(z.string())
      .refine(value => value.length > 0, {
        message: 'At least one prerequisite is required',
      })
      .optional(),
    syllabus: z
      .array(
        z.object({
          week: z.number(),
          topic: z.string(),
          content: z.string(),
        }),
      )
      .optional(),
    students: z
      .array(
        z.object({
          id: z.number(),
          name: z.string(),
          email: z.string().email().optional(),
        }),
      )
      .optional(),
  }),
});

export const CourseValidation = {
  createCourseZodSchema,
  updateCourseZodSchema,
};
