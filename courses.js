"use strict";

// GLOBAL VARIABLES

let input = document.getElementById("searchbox");

// FUNCTIONS

// Function to clear input-box on each page-refresh.

window.onload = function () {
  document.getElementById("searchbox").value = "";
};

// Function to find courses in the database by their titles.

function findCourseByTitle() {
  let course = DATABASE.courses.filter((course) =>
    course.title.toLowerCase().includes(input.value.toLowerCase())
  );

  return course;
}

function findCourseResponsible(courses) {
  let courseResponsible = [];
  for (let i = 0; i < DATABASE.teachers.length; i++) {
    let div = document.createElement("div");

    if (DATABASE.teachers[i].teacherId == courses.courseResponsible) {
      let text = (div.innerHTML = `
        <div>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName} (${DATABASE.teachers[i].post})</div>
      `);
      courseResponsible.push(text);
    }
  }
  return courseResponsible;
}

// let findPassedCredits(student) {

// }

function findStudentById(course) {
  let foundStudents = [];

  for (let student of DATABASE.students) {
    for (let studentCourse of student.courses) {
      if (studentCourse.courseId == course.courseId) {
        foundStudents.push(student);
      }
    }
  }

  return foundStudents;
}

// function findTeachersById(teachers) {
//   for (let i = 0; i < DATABASE.teachers.length; i++) {
//     let
//   }

//   }

// Function to create the course with the information.

function renderCourse(course) {
  let div = document.createElement("div");

  let coursesDiv = document.getElementById("courses");
  coursesDiv.appendChild(div);

  let foundStudents = findStudentById(course);

  div.classList.add("student");

  div.innerHTML = `
    <div>${course.title} (Total: ${course.totalCredits} credits)</div>
    <div id="courseresponsible">Course Responsible: ${findCourseResponsible(
      course
    )}</div>
    <div id="teachers">Teachers: ${"hej"}</div>
    <div id="students">Students:</div>
  `;

  for (let i = 0; i < foundStudents.length; i++) {
    let foundStudent = foundStudents[i];
    // let passedCredits = DATABASE.students[i].courses[i].passedCredits;

    let studentName = document.createElement("div");
    studentName.classList.add("student");
    div.appendChild(studentName);

    studentName.innerText =
      foundStudent.firstName + " " + foundStudent.lastName;

    // console.log(foundStudent.courses[1].started.semester);

    for (let i = 0; i < foundStudent.courses.length; i++) {
      if (foundStudent.courses[i].courseId == course.courseId) {
        let semester = foundStudent.courses[i].started.semester;
        let year = foundStudent.courses[i].started.year;

        let studentInfoDiv = document.createElement("p");
        studentName.appendChild(studentInfoDiv);
        studentInfoDiv.innerText = `${semester} ${year}`;
      }
    }

    // let passedCredits = student.courses[i].passedCredits;
    // let semester = student.courses[i].started.semester;
    // let year = student.courses[i].started.year;

    // let studentInfoDiv = document.createElement("p");
    // studentName.appendChild(studentInfoDiv);
    // studentInfoDiv.innerText = foundStudent.courses;

    // DATABASE.students[1].courses[1].started.semester

    // if (passedCredits == foundCourse.totalCredits) {
    //   let course = courseInfoDiv.parentElement;
    //   course.style.backgroundColor = "lightgreen";

    // }
  }
}

// Function to loop through each course to add the HTML onto the webpage.

function renderCourses(courses) {
  courses.forEach((course) => {
    renderCourse(course);
  });
}

//   // Function to find courses by their courseID.

input.addEventListener("keyup", function () {
  let course = findCourseByTitle();
  let coursesDiv = document.getElementById("courses");

  coursesDiv.innerHTML = "";
  renderCourses(course);

  if (input.value == 0) {
    coursesDiv.innerHTML = "";
  }
});
