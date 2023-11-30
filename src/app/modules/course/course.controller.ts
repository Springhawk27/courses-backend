// users.controller.ts
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { courseFilterableFields } from './course.constant';
import { ICourse } from './course.interface';
import { CourseService } from './course.service';

const createCourse = async (req: Request, res: Response) => {
  try {
    const course = req.body;
    const result = await CourseService.createCourse(course);
    res.status(200).json({
      success: true,
      message: 'Course created successfully',
      data: result,
    });
  } catch (err) {
    // console.log(err)
    res.status(400).json({
      success: false,
      message: 'Failed to create course',
    });
  }
};

const getAllCourses = catchAsync(async (req: Request, res: Response) => {
  // search filter
  const filters = pick(req.query, courseFilterableFields);
  // pagination options
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CourseService.getAllCourse(filters, paginationOptions);

  sendResponse<ICourse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Retrieved Successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CourseService.getSingleCourse(id);

  sendResponse<ICourse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Retrieved Successfully',
    data: result,
  });
});

// update course
const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await CourseService.updateCourse(id, updatedData);

  sendResponse<ICourse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Updated Successfully',
    data: result,
  });
});

// delete course
const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CourseService.deleteCourse(id);

  sendResponse<ICourse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Deleted Successfully',
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
