"use strict";

// ============================= HTML =================================

const toast = document.querySelector(".toast");
const notif = document.querySelector("#notif");
const submitform = document.querySelector("#submitform");
const taskTitle = document.querySelector("#task");
const doneTask = document.querySelector("#done");
const progressTask = document.querySelector("#progress");
const mainList = document.querySelector(".list");
const delTask = document.querySelectorAll(".del");
const editTask = document.querySelectorAll(".edit");
const chcekTask = document.querySelectorAll(".check");
const savedState = document.querySelector(".saved");
const changedState = document.querySelector(".changed");

//  ============================= task ===================================

let task = [
  // {
  //   id: Date.now(),
  //   title: "Lorem Ipsum dolor sit amet",
  //   status: true,
  // },
  // {
  //   id: Date.now(),
  //   title: "Lorem Ipsum dolor",
  //   status: false,
  // },
  // {
  //   id: Date.now(),
  //   title: "Lorem sit amet",
  //   status: true,
  // },
];

//  =============================== Dynamic task list =============================

function renderTaskList(taskList) {
  if (taskList.length) {
    taskList.forEach((task) => {
      const taskItem = createElement(
        "li",
        "mt-3 w-full p-3 shadow-lg bg-white rounded-md mb-3 list_item",
        `<div class="saved flex justify-between">
        <p class="title text-xl">${task.title}</p>
        <div class="btn-group flex justify-between">
          <i data-del='${
            task.id
          }' class="del bx bx-trash text-2xl text-red-600 mx-2 active:text-red-800 cursor-pointer"></i>
          <i data-edit='${
            task.id
          }' class="edit bx bx-edit text-2xl text-sky-600 mx-2 active:text-sky-800 cursor-pointer"></i>
          <i data-check='${
            task.id
          }' class="check bx bx-check-circle text-2xl mx-2 ${
          task.status
            ? "text-green-600  active:text-green-800"
            : "text-black active:text-[#3a3a3a]"
        } cursor-pointer"></i>
        </div>
        </div>
        <div class="changed hidden rounded-sm border border-blue-400 border-spacing-1">
          <label for="edit-task" class="w-full">
            <input value='${
              task.title
            }' id="edit-task" type="text" placeholder="Edit task title" class="p-3 shadow focus:ring-4 w-full outline-none focus:ring-cyan-500"/>
          </label>
          <div class="edit-btns flex justify-evenly items-center">
            <i data-save='${
              task.id
            }' class="save bx bx-save text-2xl text-green-600 mx-2 active:text-green-800 cursor-pointer"></i>
            <i data-cancel='${
              task.id
            }' class="cancel bx bx-x text-2xl text-red-600 mx-2 active:text-red-800 cursor-pointer"></i>
          </div>
        </div> 
          `
      );
      taskItem.dataset.id = task.id;
      mainList.append(taskItem);
      // console.log(taskItem);
    });
  } else {
    mainList.innerHTML =
      "<h2 class='text-center text-2xl text-bold text-red-500'>NOT FOUND!</h2>";
  }
}

renderTaskList(task);

// ========= dynamic task list rendering end========================

// ========== count task done  or ===============================

function countTaskDone(taskList) {
  const done = taskList.filter((item) => item.status === true).length;
  const progress = taskList.filter((item) => item.status === false).length;
  // console.log(done, progress);
  doneTask.textContent = done;
  progressTask.textContent = progress;
}

countTaskDone(task);

//  ============= add new task =================

function addNewTask() {
  const title = taskTitle.value;
  // console.log(title);
  const newTask = {
    id: Date.now(),
    title: title,
    status: false,
  };
  const check = {
    title: newTask.title.trim().length === 0,
  };

  if (check.title) {
    alert("Please enter a title for a task");
    //toast warning
  } else {
    task.push(newTask);
    taskTitle.value = "";
    //toast success
    forSuccess();
  }
}

submitform.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewTask();
  mainList.innerHTML = "";
  renderTaskList(task);
  countTaskDone(task);
});

function forSuccess() {
  toast.classList.remove("bg-red-600");
  toast.classList.remove("bg-yellow-600");
  toast.classList.add("bg-green-600");
  toast.classList.toggle("translate-x-72");
  notif.textContent = "Successfully Added";
  setTimeout(() => {
    toast.classList.toggle("translate-x-72");
  }, 2000);
}

function forEdit() {
  toast.classList.remove("bg-yellow-600");
  toast.classList.add("bg-green-600");
  notif.textContent = "Successfully Updated";
  toast.classList.toggle("translate-x-72");
  setTimeout(() => {
    toast.classList.toggle("translate-x-72");
  }, 2000);
}

function forDelete() {
  toast.classList.remove("bg-yellow-600");
  toast.classList.add("bg-red-600");
  notif.textContent = "Successfully Deleted";
  toast.classList.toggle("translate-x-72");
  setTimeout(() => {
    toast.classList.toggle("translate-x-72");
  }, 2000);
}

function forCancel() {
  toast.classList.remove("bg-yellow-600");
  toast.classList.add("bg-red-600");
  notif.textContent = "Successfully Canceled";
  toast.classList.toggle("translate-x-72");
  setTimeout(() => {
    toast.classList.toggle("translate-x-72");
  }, 2000);
}

function forCheck(status) {
  console.log(status);
  toast.classList.remove("bg-yellow-600");
  toast.classList.add(`${status ? "bg-green-600" : "bg-yellow-600"}`);
  notif.textContent = status ? "Added to done list" : "Added to to-do list";
  toast.classList.toggle("translate-x-72");
  setTimeout(() => {
    toast.classList.toggle("translate-x-72");
  }, 2000);
}
//  ============= add new task end =================

mainList.addEventListener("click", (e) => {
  if (e.target.classList.contains(`del`)) {
    const id = e.target.getAttribute("data-del");
    mainList.innerHTML = "";
    task = task.filter((task) => task.id != id);
    renderTaskList(task);
    countTaskDone(task);
    forDelete();
  } else if (e.target.classList.contains(`check`)) {
    const id = e.target.getAttribute("data-check");
    mainList.innerHTML = "";
    // console.log(id);
    task.forEach((t) => {
      if (t.id == id) {
        if (t.status == true) {
          t.status = false;
        } else {
          t.status = true;
        }
        forCheck(t.status);
      }
    });
    renderTaskList(task);
    countTaskDone(task);
  } else if (e.target.classList.contains("edit")) {
    
    const id = e.target.getAttribute("data-edit");
    updateIgnoredTask(id);
    // console.log(id);
    const el = mainList.querySelector(`[data-id = "${id}"]`);
    // console.log(el);
    el.querySelector(".saved").classList.remove("flex");
    el.querySelector(".saved").classList.add("hidden");
    el.querySelector(".changed").classList.remove("hidden");
    el.querySelector(".changed").classList.add("flex");

  } else if (e.target.classList.contains("save")) {
    const id = e.target.getAttribute("data-save");
    const el = mainList.querySelector(`[data-id = "${id}"]`);
    // console.log(id);
    // ==========
    const savedState1 = el.querySelector(".saved");
    const p = savedState1.querySelector(".title");
    const changedState1 = el.querySelector(".changed");
    const input = changedState1.querySelector("#edit-task");
    if (!input.value) {
      alert("Please enter a new title");
    } else {
      el.querySelector(".saved").classList.remove("hidden");
      el.querySelector(".saved").classList.add("flex");
      p.textContent = input.value;
      el.querySelector(".changed").classList.remove("flex");
      el.querySelector(".changed").classList.add("hidden");
      task.forEach((item) => {
        if (item.id == id) {
          item.title = input.value;
        }
      });
      mainList.innerHTML = "";
      renderTaskList(task);
      countTaskDone(task);
      forEdit();
    }
  } else if (e.target.classList.contains("cancel")) {
    const id = e.target.getAttribute("data-cancel");
    // console.log(id);
    const el = mainList.querySelector(`[data-id = "${id}"]`);
    el.querySelector(".saved").classList.remove("hidden");
    el.querySelector(".saved").classList.add("flex");
    el.querySelector(".changed").classList.remove("flex");
    el.querySelector(".changed").classList.add("hidden");
    forCancel();
  }
});

function updateIgnoredTask(id) {
  task.forEach((item) => {
    if (item.id != id) {
      const el = mainList.querySelector(`[data-id = "${item.id}"]`);
      el.querySelector(".saved").classList.remove("hidden");
      el.querySelector(".saved").classList.add("flex");
      el.querySelector(".changed").classList.remove("flex");
      el.querySelector(".changed").classList.add("hidden");
    }
  });
  mainList.innerHTML = "";
  renderTaskList(task);
  countTaskDone(task);
}
