"use strict";

// GLOBAL VARIABLES

let input = document.getElementById("searchbox");

// FUNCTIONS (in alphabetical order)

// Function to find courses in the database by their titles.

function findCourseByTitle() {
  let course = DATABASE.courses.filter((course) =>
    course.title.toLowerCase().includes(input.value.toLowerCase())
  );


  return course.sort(function(a, b){
    if(a.title < b.title) { return -1; }
    if(a.title > b.title) { return 1; }
    return 0;
  });
}

// Function to find the course responsible for each course.

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

// Function to find a student by its ID.

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


// Function to find the teachers for each course.

function findTeachers(courses) {
  let teachers = [];

  for (let i = 0; i < DATABASE.teachers.length; i++) {
    let div = document.createElement("div");

    for (let j = 0; j < courses.teachers.length; j++) {
      if (DATABASE.teachers[i].teacherId == courses.teachers[j]) {
        let text = (div.innerHTML = `
        <div>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName} (${DATABASE.teachers[i].post})</div>
      `);
        teachers.push(text);
        
      }
    }
  }
  return teachers.toString().split(",").join("");
}

// Function to render a course with all the information it contains.

function renderCourse(course) {
  let div = document.createElement("div");
  let coursesDiv = document.getElementById("courses");
  coursesDiv.appendChild(div);

  div.classList.add("course");

  div.innerHTML = `
    <h2>${course.title} (Total: ${course.totalCredits} credits)</h2>
    <h3 id="courseresponsible">Course Responsible: ${findCourseResponsible(
      course
    )}</h3>
    <h3 id="teachers">Teachers: ${findTeachers(course)}</h3>
    <h3 id="students">Students:</h3>
  `;

  let studentWrapper = document.createElement("div");

  for (let student of DATABASE.students) {
    for (let studentCourse of student.courses) {
      if (studentCourse.courseId == course.courseId) {
        let p = document.createElement("p");
        p.classList.add("course");
        p.innerHTML = `
          <p>${student.firstName} ${student.lastName} (${studentCourse.passedCredits} credits) <br>
          ${studentCourse.started.semester} ${studentCourse.started.year}
          </p>
        `;

        if (studentCourse.passedCredits == course.totalCredits) {
          p.classList.add("passed");
        }
        studentWrapper.appendChild(p);
        div.appendChild(studentWrapper);
      }
    }
  }
}

// Function to loop through each course to add the HTML onto the webpage.

function renderCourses(courses) {
  courses.forEach((course) => {
    renderCourse(course);
  });
}

// Function to clear input-box on each page-refresh.

window.onload = function () {
  document.getElementById("searchbox").value = "";
};

// EVENT LISTENERS

// Event-listener to run the functions to filter through courses each time a key is pressed in the input field.

input.addEventListener("keyup", function () {
  let course = findCourseByTitle();
  let coursesDiv = document.getElementById("courses");

  coursesDiv.innerHTML = "";
  renderCourses(course);

  if (input.value == 0) {
    coursesDiv.innerHTML = "";
  }
});

// DARK BACKGROUND CODE

function darkMode () {
  let setTheme = document.body;
  setTheme.classList.toggle("dark-mode");

  let theme;
  if (setTheme.classList.contains("dark-mode")) {
    theme = "DARK";
  } else {
    theme = "LIGHT";
  }

  localStorage.setItem("theme", JSON.stringify(theme));
}

let getTheme = JSON.parse(localStorage.getItem("theme"));

if (getTheme === "DARK") {
  document.body.classList = "dark-mode";
}