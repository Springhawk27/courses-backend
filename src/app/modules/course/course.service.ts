import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { courseSearchableFields } from './course.constant';
import { ICourse, ICourseFilters } from './course.interface';
import { Course } from './course.model';
import { generateCourseId } from './course.utils';

const createCourse = async (course: ICourse): Promise<ICourse | null> => {
  // auto generated incremental id
  const id = await generateCourseId();

  course.id = id;
  // course.enrollmentStatus = 'Open';

  const createdCourse = await Course.create(course);
  if (!createdCourse) {
    throw new Error('Failed to create Course');
  }
  return createdCourse;
};

const getAllCourse = async (
  filters: ICourseFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ICourse[]>> => {
  // search and filter
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  // search
  if (searchTerm) {
    andConditions.push({
      $or: courseSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i', //  case-insensitive
        },
      })),
    });
  }

  // filter
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  // console.log('checking sortBy', sortBy);
  // console.log('checking sortOrder', sortOrder);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Course.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  // const total = await Course.countDocuments();
  const total = await Course.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get single Course
const getSingleCourse = async (id: string): Promise<ICourse | null> => {
  const result = await Course.findById(id);
  return result;
};

// update Course service
const updateCourse = async (
  id: string,
  payload: Partial<ICourse>,
): Promise<ICourse | null> => {
  const result = await Course.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// delete Course
const deleteCourse = async (id: string): Promise<ICourse | null> => {
  const result = await Course.findByIdAndDelete(id);
  return result;
};

export const CourseService = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
