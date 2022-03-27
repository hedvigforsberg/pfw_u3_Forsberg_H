"use strict";

// GLOBAL VARIABLES

let input = document.getElementById("searchbox");

// IMPORTANT NOTES:
// - The input box is currently not case insensitive.

// FUNCTIONS

// Function to clear input-box on each page-refresh.

// Function to find students in the database by their last name.

function findStudentsByLastName() {
  let student = DATABASE.students.filter((student) =>
    student.lastName.toLowerCase().includes(input.value.toLowerCase())
  );
  // .map((student) => student.firstName + " " + student.lastName);

  student.sort();

  return student;
}

// Function to create a student.

function renderStudent(student) {
  let div = document.createElement("div");

  let studentsDiv = document.getElementById("students");
  studentsDiv.appendChild(div);
  

  let credits = totalCredits(student);

  let foundCourses = findCourseById(student);
  
  div.classList.add("student");
  div.innerHTML = `
    <div>${student.firstName} ${student.lastName} (Total: ${credits} credits)</div>
    <div id=courses>Courses:</div>
  `;

  for (let i = 0; i < foundCourses.length; i++) {
    let foundCourse = foundCourses[i];

    let courseDiv = document.createElement("div");
    courseDiv.classList.add("course");
    div.appendChild(courseDiv);
    
    courseDiv.innerText =
      foundCourse.title + ", " + "of" + " " + foundCourse.totalCredits + " " + "credits";
    
  //   let courseInfoDiv = document.createElement("div");
  //   courseDiv.appendChild(courseInfoDiv);
  //   courseInfoDiv.innerText = 
  //     foundCourse.started.semester;
   }
}

// Function to loop through each student to add the HTML onto the webpage.

function renderStudents(students) {
  students.forEach((student) => {
    renderStudent(student);
  });
}

function totalCredits(student) {
  let credit = [];
  for (let course of student.courses) {
    credit.push(course.passedCredits);
  }
  let totalSum = 0;
  for (let i = 0; i < credit.length; i++) {
    totalSum += credit[i];
  }
  return totalSum;
}
// Function to find courses

function findCourseById(student) {
  let foundCourses = [];
  for (let i = 0; i < student.courses.length; i++) {
    foundCourses.push(
      DATABASE.courses.find((course) => {
        return course.courseId == student.courses[i].courseId;
      })
    );
  }
  return foundCourses;
}

// EVENT LISTENERS

// Event-listener to run the functions to filter through students each time a key is pressed.
input.addEventListener("keyup", function () {
  let student = findStudentsByLastName();
  let studentsDiv = document.getElementById("students");

  studentsDiv.innerHTML = "";
  renderStudents(student);

  if (input.value == 0) {
    studentsDiv.innerHTML = "";
  }
});
