"use strict";

// GLOBAL VARIABLES

let input = document.getElementById("searchbox");

// IMPORTANT NOTES:
// - The input box is currently not case insensitive.

// FUNCTIONS

// Function to clear input-box on each page-refresh.
window.onload = function () {
  document.getElementById("searchbox").value = "";
};

// Function to find students in the database by their last name.

function findStudentsByLastName() {
  let foundStudent = DATABASE.students
    .filter((student) =>
      student.lastName.toLowerCase().includes(input.value.toLowerCase()))
    .map((student) => student.firstName + " " + student.lastName);
  
  foundStudent.sort();
  return foundStudent;
};

// Function to create a student.

function createStudent(student) {
  let div = document.createElement("div");

  let studentsDiv = document.getElementById("students");
  studentsDiv.appendChild(div);

  div.innerHTML = `
    <div>${student}</div>
    <div>(Total: ${"totalCredits"} credits)</div>
    <div id=courses>Courses:</div>
  `;
};

// Function to loop through each student to add the HTML onto the webpage.

function renderStudents(students) {
  students.forEach((student) => {
    createStudent(student);
  });
};

// Function to find courses

function findCoursesForStudent () {
  let student = foundStudent;
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
