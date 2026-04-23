function hideAllSteps() {
  document.querySelectorAll(".step").forEach(step => {
    step.style.display = "none";
  });
}

// STEP 1 → STEP 2
function goToStep2() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let age = document.getElementById("age").value.trim();
  let city = document.getElementById("city").value.trim();

  let valid = true;

  let namePattern = /^[A-Za-z ]+$/;
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  document.getElementById("nameError").innerText = "";
  document.getElementById("emailError").innerText = "";
  document.getElementById("ageError").innerText = "";
  document.getElementById("cityError").innerText = "";

  if (!namePattern.test(name)) {
    document.getElementById("nameError").innerText = "Only letters allowed";
    valid = false;
  }

  if (!emailPattern.test(email)) {
    document.getElementById("emailError").innerText = "Invalid email";
    valid = false;
  }

  if (age <= 0) {
    document.getElementById("ageError").innerText = "Enter valid age";
    valid = false;
  }

  if (city === "") {
    document.getElementById("cityError").innerText = "Enter city";
    valid = false;
  }

  if (!valid) return;

  // CONDITIONAL LOGIC
  if (age < 18) {
    document.getElementById("course").style.display = "none";
  } else {
    document.getElementById("course").style.display = "block";
  }

  saveData();

  hideAllSteps();
  document.getElementById("step2").style.display = "block";
}

// STEP 2 → STEP 3
function goToStep3() {
  let phone = document.getElementById("phone").value.trim();
  let gender = document.getElementById("gender").value.trim();
  let course = document.getElementById("course").value.trim();
  let skills = document.getElementById("skills").value.trim();

  let valid = true;

  let phonePattern = /^[0-9]{10}$/;
  let textPattern = /^[A-Za-z ]+$/;

  document.getElementById("phoneError").innerText = "";
  document.getElementById("genderError").innerText = "";
  document.getElementById("courseError").innerText = "";
  document.getElementById("skillsError").innerText = "";

  if (!phonePattern.test(phone)) {
    document.getElementById("phoneError").innerText = "Enter 10-digit phone";
    valid = false;
  }

  if (!textPattern.test(gender)) {
    document.getElementById("genderError").innerText = "Only text allowed";
    valid = false;
  }

  if (course === "" && document.getElementById("course").style.display !== "none") {
    document.getElementById("courseError").innerText = "Enter course";
    valid = false;
  }

  if (skills === "") {
    document.getElementById("skillsError").innerText = "Enter skills";
    valid = false;
  }

  if (!valid) return;

  saveData();

  let data = JSON.parse(localStorage.getItem("formData"));

  document.getElementById("review").innerHTML = `
    <p><b>Name:</b> ${data.name}</p>
    <p><b>Email:</b> ${data.email}</p>
    <p><b>Age:</b> ${data.age}</p>
    <p><b>City:</b> ${data.city}</p>
    <p><b>Phone:</b> ${data.phone}</p>
    <p><b>Gender:</b> ${data.gender}</p>
    <p><b>Course:</b> ${data.course || "N/A"}</p>
    <p><b>Skills:</b> ${data.skills}</p>
  `;

  hideAllSteps();
  document.getElementById("step3").style.display = "block";
}

// BACK BUTTONS
function goToStep1() {
  hideAllSteps();
  document.getElementById("step1").style.display = "block";
}

function goToStep2Back() {
  hideAllSteps();
  document.getElementById("step2").style.display = "block";
}

// SAVE DATA
function saveData() {
  const data = {
    name: name.value,
    email: email.value,
    age: age.value,
    city: city.value,
    phone: phone.value,
    gender: gender.value,
    course: course.value,
    skills: skills.value
  };

  localStorage.setItem("formData", JSON.stringify(data));
}

// LOAD DATA
window.onload = function () {
  let data = JSON.parse(localStorage.getItem("formData"));
  if (!data) return;

  name.value = data.name || "";
  email.value = data.email || "";
  age.value = data.age || "";
  city.value = data.city || "";
  phone.value = data.phone || "";
  gender.value = data.gender || "";
  course.value = data.course || "";
  skills.value = data.skills || "";
};

// SUBMIT
function submitForm() {
  alert("Form Submitted Successfully!");
  localStorage.clear();
}