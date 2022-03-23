"use strict";

// Function to clear input-box on each reload.
window.onload = function () {
  document.getElementById("searchbox").value = "";
};

// Function to search in the input-box for students by their last name from the letters you type.

function searchForStudent() {
  let input = document.getElementById("searchbox");
  input.value.toLowerCase();

  let students = findStudentsByLastName(input);
  renderStudents(students);
}

// Function to find students by their last name.

function findStudentsByLastName(name) {
  return DATABASE.students.filter(student => {
    return student.lastName.toLowerCase().includes(name);
  });
}
// Function to render students onto the webpage.

function renderStudents() {

}
