import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';
import { CourseValidation } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidation.createCourseZodSchema),
  CourseController.createCourse,
);
router.get('/:id', CourseController.getSingleCourse);

router.patch(
  '/:id',
  validateRequest(CourseValidation.updateCourseZodSchema),
  CourseController.updateCourse,
);
router.delete('/:id', CourseController.deleteCourse);
router.get('/', CourseController.getAllCourses);

export const CourseRoutes = router;
