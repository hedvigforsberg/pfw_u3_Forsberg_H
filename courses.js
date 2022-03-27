"use strict";

let input = document.getElementById("searchbox");

window.onload = function () {
    document.getElementById("searchbox").value = "";
  };
  
function findCourseByTitle() {
  let course = DATABASE.courses
    .filter((course) =>
      course.title.toLowerCase().includes(input.value.toLowerCase())
    )
    .map((course) => course.title + " " + course.totalCredits);

    course.sort();

    return course;
}

function createCourse(course) {
    let div = document.createElement("div");

    let coursesDiv = document.getElementById("courses");
    coursesDiv.appendChild(div);

    div.innerHTML = `
        <div>${course}</div>
    `;
}

function renderCourses(courses) {
    courses.forEach((course) => {
        createCourse(course);
    })
}

input.addEventListener("keyup", function () {
    let course = findCourseByTitle();
    let coursesDiv = document.getElementById("courses");

    coursesDiv.innerHTML = "";
    renderCourses(course);
    
    if (input.value == 0) {
        coursesDiv.innerHTML = "";
    }
})