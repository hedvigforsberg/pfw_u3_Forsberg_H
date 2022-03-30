let div = document.createElement("div");

  let coursesDiv = document.getElementById("courses");
  coursesDiv.appendChild(div);

  let foundStudents = findStudentById(course);

  div.classList.add("student");

  div.innerHTML = `
    <div>${course.title} (Total: ${course.totalCredits} credits)</div>
    <div id="courseresponsible">Course Responsible: ${findCourseResponsible(course)}</div>
    <div id="teachers">Teachers: ${findTeachers(course)}</div>
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

    // let credits = totalCredits(student);


    // console.log(foundStudent.courses[1].started.semester);

    for (let i = 0; i < foundStudent.courses.length; i++) {
      if (foundStudent.courses[i].courseId == course.courseId) {
        let semester = foundStudent.courses[i].started.semester;
        let year = foundStudent.courses[i].started.year;
        let passedCredits = foundStudent.courses[i].passedCredits;

        let studentInfoDiv = document.createElement("p");
        studentName.appendChild(studentInfoDiv);
        studentInfoDiv.innerHTML = `
        <div>Passed credits: ${passedCredits} <br> Started: ${semester} ${year}</div>`

        if (course.totalCredits == passedCredits) {
          let student = studentInfoDiv.parentElement;
          student.style.backgroundColor = "lightgreen";
        }
      }
    }
  }