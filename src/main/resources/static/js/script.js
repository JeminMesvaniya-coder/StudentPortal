console.log("Student Portal Javascript Connected");

// ELEMENTS

const studentForm = document.getElementById("studentForm");

const studentTableBody = document.getElementById("studentTableBody");

const studentCount = document.getElementById("studentCount");

const searchInput = document.getElementById("searchInput");

const studentModal = document.getElementById("studentModal");

const viewModal = document.getElementById("viewModal");

const deleteModal = document.getElementById("deleteModal");

const openAddModal = document.getElementById("openAddModal");

const emptyAddBtn = document.getElementById("emptyAddBtn");

const closeModal = document.getElementById("closeModal");

const closeViewModal = document.getElementById("closeViewModal");

const cancelBtn = document.getElementById("cancelBtn");

const cancelDelete = document.getElementById("cancelDelete");

const confirmDelete = document.getElementById("confirmDelete");

const modalTitle = document.getElementById("modalTitle");

const modalSubtitle = document.getElementById("modalSubtitle");

const saveBtn = document.getElementById("saveBtn");

const emptyState = document.getElementById("emptyState");

// FORM INPUTS

const nameInput = document.getElementById("name");

const emailInput = document.getElementById("email");

const mobileInput = document.getElementById("mobile");

const courseInput = document.getElementById("course");

const cityInput = document.getElementById("city");

// VIEW INPUTS

const viewId = document.getElementById("viewId");

const viewName = document.getElementById("viewName");

const viewEmail = document.getElementById("viewEmail");

const viewMobile = document.getElementById("viewMobile");

const viewCourse = document.getElementById("viewCourse");

const viewCity = document.getElementById("viewCity");

const viewAvatar = document.getElementById("viewAvatar");

// VARIABLES

let editingStudentId = null;

let deletingStudentId = null;

// LOAD STUDENTS

async function loadStudents() {
  try {
    const response = await fetch("/students");

    if (!response.ok) {
      throw new Error("Could not load students");
    }

    const students = await response.json();

    displayStudents(students);
  } catch (error) {
    console.error("Error loading students:", error);

    alert("Failed to load students.");
  }
}

// DISPLAY STUDENTS

function displayStudents(students) {
  studentTableBody.innerHTML = "";

  studentCount.textContent = students.length;

  if (students.length === 0) {
    emptyState.style.display = "block";

    return;
  }

  emptyState.style.display = "none";

  students.forEach(function (student) {
    const row = document.createElement("tr");

    const firstLetter = student.name
      ? student.name.charAt(0).toUpperCase()
      : "S";

    row.innerHTML = `

            <td>
                ${student.id}
            </td>

            <td>

                <div class="student-name">

                    <div class="student-avatar">
                        ${firstLetter}
                    </div>

                    <span class="name-text">
                        ${student.name}
                    </span>

                </div>

            </td>

            <td>
                ${student.email}
            </td>

            <td>
                ${student.mobile}
            </td>

            <td>
                ${student.course}
            </td>

            <td>
                ${student.city}
            </td>

            <td>

                <div class="actions">

                    <button
                        class="action-btn"
                        title="View"
                        onclick="viewStudent(${student.id})"
                    >
                        👁
                    </button>


                    <button
                        class="action-btn"
                        title="Edit"
                        onclick="editStudent(${student.id})"
                    >
                        ✏️
                    </button>


                    <button
                        class="action-btn delete"
                        title="Delete"
                        onclick="openDeleteModal(${student.id})"
                    >
                        🗑️
                    </button>

                </div>

            </td>

        `;

    studentTableBody.appendChild(row);
  });
}

// OPEN ADD MODAL

function openAddStudentModal() {
  editingStudentId = null;

  studentForm.reset();

  modalTitle.textContent = "Add Student";

  modalSubtitle.textContent = "Enter student information below";

  saveBtn.textContent = "Add Student";

  studentModal.classList.add("active");

  nameInput.focus();
}

// CLOSE STUDENT MODAL

function closeStudentModal() {
  studentModal.classList.remove("active");

  studentForm.reset();

  editingStudentId = null;
}

// ADD / UPDATE STUDENT

studentForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const student = {
    name: nameInput.value.trim(),

    email: emailInput.value.trim(),

    mobile: mobileInput.value.trim(),

    course: courseInput.value.trim(),

    city: cityInput.value.trim(),
  };

  try {
    let response;

    // UPDATE

    if (editingStudentId !== null) {
      response = await fetch(`/students/${editingStudentId}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(student),
      });
    }

    // ADD
    else {
      response = await fetch("/students", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(student),
      });
    }

    if (!response.ok) {
      throw new Error("Student could not be saved");
    }

    const savedStudent = await response.json();

    console.log("Student saved:", savedStudent);

    if (editingStudentId !== null) {
      alert("Student Updated Successfully!");
    } else {
      alert("Student Added Successfully!");
    }

    closeStudentModal();

    loadStudents();
  } catch (error) {
    console.error("Error saving student:", error);

    alert("Failed to save student.");
  }
});

// VIEW STUDENT

async function viewStudent(id) {
  try {
    const response = await fetch(`/students/${id}`);

    if (!response.ok) {
      throw new Error("Student not found");
    }

    const student = await response.json();

    viewId.textContent = student.id;

    viewName.textContent = student.name;

    viewEmail.textContent = student.email;

    viewMobile.textContent = student.mobile;

    viewCourse.textContent = student.course;

    viewCity.textContent = student.city;

    viewAvatar.textContent = student.name
      ? student.name.charAt(0).toUpperCase()
      : "S";

    viewModal.classList.add("active");
  } catch (error) {
    console.error("Error viewing student:", error);

    alert("Failed to load student details.");
  }
}

// EDIT STUDENT

async function editStudent(id) {
  try {
    const response = await fetch(`/students/${id}`);

    if (!response.ok) {
      throw new Error("Student not found");
    }

    const student = await response.json();

    editingStudentId = id;

    nameInput.value = student.name || "";

    emailInput.value = student.email || "";

    mobileInput.value = student.mobile || "";

    courseInput.value = student.course || "";

    cityInput.value = student.city || "";

    modalTitle.textContent = "Edit Student";

    modalSubtitle.textContent = "Update student information";

    saveBtn.textContent = "Update Student";

    studentModal.classList.add("active");

    nameInput.focus();
  } catch (error) {
    console.error("Error editing student:", error);

    alert("Failed to load student.");
  }
}

// OPEN DELETE MODAL

function openDeleteModal(id) {
  deletingStudentId = id;

  deleteModal.classList.add("active");
}

// DELETE STUDENT

confirmDelete.addEventListener("click", async function () {
  if (deletingStudentId === null) {
    return;
  }

  try {
    const response = await fetch(`/students/${deletingStudentId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Student could not be deleted");
    }

    alert("Student Deleted Successfully!");

    deleteModal.classList.remove("active");

    deletingStudentId = null;

    loadStudents();
  } catch (error) {
    console.error("Error deleting student:", error);

    alert("Failed to delete student.");
  }
});

// SEARCH STUDENTS

searchInput.addEventListener("input", async function () {
  const name = searchInput.value.trim();

  // Show all students
  // when search is empty

  if (name === "") {
    loadStudents();

    return;
  }

  try {
    const response = await fetch(
      `/students/search?name=${encodeURIComponent(name)}`,
    );

    if (!response.ok) {
      throw new Error("Search failed");
    }

    const students = await response.json();

    displayStudents(students);
  } catch (error) {
    console.error("Error searching students:", error);
  }
});

// BUTTON EVENTS

openAddModal.addEventListener("click", openAddStudentModal);

emptyAddBtn.addEventListener("click", openAddStudentModal);

closeModal.addEventListener("click", closeStudentModal);

cancelBtn.addEventListener("click", closeStudentModal);

closeViewModal.addEventListener("click", function () {
  viewModal.classList.remove("active");
});

cancelDelete.addEventListener("click", function () {
  deleteModal.classList.remove("active");

  deletingStudentId = null;
});

// CLOSE MODAL WHEN CLICKING OUTSIDE

studentModal.addEventListener("click", function (event) {
  if (event.target === studentModal) {
    closeStudentModal();
  }
});

viewModal.addEventListener("click", function (event) {
  if (event.target === viewModal) {
    viewModal.classList.remove("active");
  }
});

deleteModal.addEventListener("click", function (event) {
  if (event.target === deleteModal) {
    deleteModal.classList.remove("active");

    deletingStudentId = null;
  }
});

// LOAD DATA WHEN PAGE OPENS

loadStudents();
