import React from "react";

const Course = ({ course }) => {
  console.log("hi", course.parts);

  const printIt = course.parts.map((course) => {
    return (
      <p key={course.id}>
        {course.name} with {course.exercises} exercises
      </p>
    );
  });

  return (
    <div>
      <h1>{course.name}</h1>
      <div>{printIt}</div>
    </div>
  );
};

export default Course;
