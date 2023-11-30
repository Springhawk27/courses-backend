// courses.model.ts
import { Model, Schema, model } from 'mongoose';
import { ICourse, ICourseEnrollmentStatus } from './course.interface';

// Create a new Model type that knows about ICourseMethods...
type CourseModel = Model<ICourse, object>;

// 2. Create a Schema corresponding to the document interface.
const courseSchema = new Schema<ICourse>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    enrollmentStatus: {
      type: String,
      required: true,
      enum: ['Open', 'Closed', 'In Progress'] as ICourseEnrollmentStatus[],
    },
    thumbnail: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    schedule: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    prerequisites: {
      type: [String],
      required: true,
    },
    syllabus: [
      {
        week: {
          type: Number,
          required: true,
        },
        topic: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
    students: [
      {
        id: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

// 3. Create a Model.
export const Course = model<ICourse, CourseModel>('Course', courseSchema);
