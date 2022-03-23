"use strict";

// Global Variables

let input = document.getElementById("searchbox");

// Function to clear input-box on each reload.
window.onload = function () {
  document.getElementById("searchbox").value = "";
};

// Function to search in the input-box for students by their last name from the letters you type.

// function searchForStudent() {

// }

// Function to find students by their last name.

function findStudentsByLastName() {
  let student = DATABASE.students
    .filter((student) => student.lastName.toLowerCase().includes(input.value))
    .map((student) => student.firstName + " " + student.lastName);
  return student;
}

// Function to render students onto the webpage.

function createStudent(student) {
  let div = document.createElement("div");
  div.classList.add("students");
  let studentsDiv = document.getElementById("students");
  studentsDiv.appendChild(div);

  div.innerHTML = `${student}`;
};

function createHTML(students) {
  students.forEach(student => {
    createStudent(student);
  })
}

// Event Listener

input.addEventListener("keyup", function () {
  let student = findStudentsByLastName();
  let studentsDiv = document.getElementById("students");

  studentsDiv.innerHTML = "";
  createHTML(student);

  if (input.value == 0) {
    studentsDiv.innerHTML = "";
  }
});
