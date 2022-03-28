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

// Function to create the course with the information.

function renderCourse(course) {
  let div = document.createElement("div");

  let coursesDiv = document.getElementById("courses");
  coursesDiv.appendChild(div);

  // let foundStudents =

  div.classList.add("student");

  div.innerHTML = `
    <div>${course.title} (Total: ${course.totalCredits} credits)</div>
    <div>Course Responsible:</div>
    <div>Teachers:</div>
    <div>Students:</div>
  `;

//   for (let i = 0; i < foundStudents.length; i++) {
//     let foundStudent = foundCourses[i];

//     let studentName = document.createElement("div");
//     studentName.classList.add("student");
//     div.appendChild(studentName);

//     studentName.innerText = `${foundStudent.firstName} + ${foundStudent.lastName} + ${passedCredits}`;

//     for (let i = 0; i < foundStudents.length; i++) {
//       let course = DATABASE.courses[i];
//     }

//     let passedCredits = student.courses[i].passedCredits;
//     let semester = student.courses[i].started.semester;
//     let year = student.courses[i].started.year;

//     let studentInfoDiv = document.createElement("p");
//     studentName.appendChild(studentInfoDiv);
//     studentInfoDiv.innerHTML = `
//         <p></p>
//     `

//     //if () {}
//     let student = studentInfoDiv.parentElement;
//     student.style.backgroundColor = "lightgreen";
  }


// Function to loop through each course to add the HTML onto the webpage.

function renderCourses (courses) {
    courses.forEach((course) => {
        renderCourse(course);
    })
}

// function totalCredits(student) {
//     for (let i = 0; i < student.courses.length;
//     let credit = [];
//     for (let course of student.courses) {
//       credit.push(course.passedCredits);
//     }
//     let totalSum = 0;
//     for (let i = 0; i < credit.length; i++) {
//       totalSum += credit[i];
//     }
//     return totalSum;
//   }
  
//   // Function to find courses by their courseID.
  
//   function findCourseById(student) {
//     let foundCourses = [];
//     for (let i = 0; i < student.courses.length; i++) {
//       foundCourses.push(
//         DATABASE.courses.find((course) => {
//           return course.courseId == student.courses[i].courseId;
//         })
//       );
//     }
//     return foundCourses;
//   }

input.addEventListener("keyup", function () {
  let course = findCourseByTitle();
  let coursesDiv = document.getElementById("courses");

  coursesDiv.innerHTML = "";
  renderCourses(course);

  if (input.value == 0) {
    coursesDiv.innerHTML = "";
  }
});
