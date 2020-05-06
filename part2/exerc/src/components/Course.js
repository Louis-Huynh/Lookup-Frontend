import React from "react";

const CourseNames = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const PartsAndExercises = ({ printIt }) => {
  return <div>{printIt}</div>;
};

const SumExerc = ({ sumIt }) => {
  return <b>Sum: {sumIt}</b>;
};
const Course = ({ course }) => {
  const printIt = course.parts.map((course) => {
    return (
      <p key={course.id}>
        {course.name} with {course.exercises} exercises
      </p>
    );
  });

  const sumIt = course.parts.reduce((acc, curr) => {
    return acc + curr.exercises;
  }, 0);

  return (
    <div>
      <CourseNames course={course} />
      <PartsAndExercises printIt={printIt} />
      <SumExerc sumIt={sumIt} />
    </div>
  );
};

export default Course;
