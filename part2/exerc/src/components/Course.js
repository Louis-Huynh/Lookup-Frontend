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

  const sumIt = course.parts.reduce((acc, curr) => {
    return acc + curr.exercises;
  }, 0);

  return (
    <div>
      <h1>{course.name}</h1>
      <div>{printIt}</div>
      <b>Sum: {sumIt}</b>
    </div>
  );
};

export default Course;