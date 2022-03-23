"use strict";

// GLOBAL VARIABLES

let input = document.getElementById("searchbox");

// FUNCTIONS

// Function to clear input-box on each page-refresh.
window.onload = function () {
  document.getElementById("searchbox").value = "";
};

// Function to find students in the database by their last name.

function findStudentsByLastName() {
  let student = DATABASE.students
    .filter((student) => student.lastName.toLowerCase().includes(input.value))
    .map((student) => student.firstName + " " + student.lastName);
  return student;
}

// Function to create a student to later render onto the webpage.

function createStudent(student) {
  let div = document.createElement("div");
  div.classList.add("students");
  let studentsDiv = document.getElementById("students");
  studentsDiv.appendChild(div);

  div.innerHTML = `${student}`;
};

// Function to create HTML to render the students onto the webpage. 

function createHTML(students) {
  students.forEach(student => {
    createStudent(student);
  })
}

// EVENT LISTENERS

// Event-listener to run the functions to filter through students each time a key is pressed.
input.addEventListener("keyup", function () {
  let student = findStudentsByLastName();
  let studentsDiv = document.getElementById("students");

  studentsDiv.innerHTML = "";
  createHTML(student);

  if (input.value == 0) {
    studentsDiv.innerHTML = "";
  }
});
