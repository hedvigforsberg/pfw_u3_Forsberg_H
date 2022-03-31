"use strict";

// GLOBAL VARIABLES

let input = document.getElementById("searchbox");

// FUNCTIONS (in alphabetical order)

// Function to find courses by their courseID.

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

// Function to find students in the database by their last name.

function findStudentsByLastName() {
  let student = DATABASE.students.filter((student) =>
    student.lastName.toLowerCase().includes(input.value.toLowerCase())
  );

  return student.sort(function(a, b){
    if(a.lastName < b.lastName) { return -1; }
    if(a.lastName > b.lastName) { return 1; }
    return 0;
});
}

// Function to create a student with the information.

function renderStudent(student) {
  let div = document.createElement("div");

  let studentsDiv = document.getElementById("students");
  studentsDiv.appendChild(div);

  let credits = totalCredits(student);

  let foundCourses = findCourseById(student);
  
  div.classList.add("student");
  
  div.innerHTML = `
    <h2>${student.firstName} ${student.lastName} (Total: ${credits} credits)</h2>
    <h3 id=courses>Courses:</h3>
  `;

  let courseWrapper = document.createElement("div");

  for (let i = 0; i < foundCourses.length; i++) {
    let foundCourse = foundCourses[i];

    let courseTitle = document.createElement("div");
    courseTitle.classList.add("course");
    courseWrapper.appendChild(courseTitle);
    div.appendChild(courseWrapper);

    courseTitle.innerText = foundCourse.title;

    let passedCredits = student.courses[i].passedCredits;
    let semester = student.courses[i].started.semester;
    let year = student.courses[i].started.year;
    
    let courseInfoDiv = document.createElement("p");
    courseTitle.appendChild(courseInfoDiv);
    courseInfoDiv.innerText =  semester + " " + year + " " + "(" + passedCredits + " " +  "of" + " " + foundCourse.totalCredits + " " + "credits" + ")";
    
    if (passedCredits == foundCourse.totalCredits) {
      let course = courseInfoDiv.parentElement;
      course.style.backgroundColor = "lightgreen";
      
    }
   }
  }


// Function to loop through each student to add the HTML onto the webpage.

function renderStudents(students) {
  students.forEach((student) => {
    renderStudent(student);
  });
}

// Function to calculate the total credits for the student.

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

// Function to clear input-box on each page-refresh.

window.onload = function () {
  document.getElementById("searchbox").value = "";
};

// EVENT LISTENERS

// Event-listener to run the functions to filter through students each time a key is pressed in the input field.
input.addEventListener("keyup", function () {
  let student = findStudentsByLastName();
  let studentsDiv = document.getElementById("students");

  studentsDiv.innerHTML = "";
  renderStudents(student);

  if (input.value == 0) {
    studentsDiv.innerHTML = "";
  }
});
