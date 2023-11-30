import { Course } from './course.model';

export const findLastCourseId = async () => {
  const lastCourse = await Course.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastCourse?.id;
};

export const generateCourseId = async () => {
  const currentId =
    (await findLastCourseId()) || (0).toString().padStart(5, '0');
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  return incrementedId;
};
