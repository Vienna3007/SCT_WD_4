let tasks =
JSON.parse(
localStorage.getItem("tasks")
) || [];

const modal =
document.getElementById("taskModal");

document
.getElementById("addTaskBtn")
.addEventListener("click",()=>{

    modal.style.display="flex";

});

window.addEventListener("click",(e)=>{

    if(e.target===modal){

        modal.style.display="none";
    }
});

function saveTask(){

    const name =
    document.getElementById("taskName").value;

    const date =
    document.getElementById("taskDate").value;

    const priority =
    document.getElementById("taskPriority").value;

    if(name==="") return;

    tasks.push({

        id:Date.now(),

        name:name,

        date:date,

        priority:priority,

        status:"Pending"
    });

    updateStorage();

    document.getElementById("taskName").value="";
    document.getElementById("taskDate").value="";

    modal.style.display="none";
}

function renderTasks(){

    const table =
    document.getElementById("taskTable");

    table.innerHTML="";

    let completedCount=0;

    tasks.forEach(task=>{

        if(task.status==="Completed"){
            completedCount++;
        }

        table.innerHTML += `

        <tr>

            <td>${task.name}</td>

            <td>${task.date || "No Date"}</td>

            <td>

                <span class="status ${
                    task.status==="Completed"
                    ? "completed"
                    : "pending"
                }">

                ${task.status}

                </span>

            </td>

            <td class="${task.priority.toLowerCase()}">

                ${task.priority}

            </td>

            <td>

                <img
                class="assignee-avatar"
                src="https://i.pravatar.cc/40?img=12">

            </td>

            <td>

                <button
                class="action-btn complete-btn"
                onclick="completeTask(${task.id})">

                ✓

                </button>

                <button
                class="action-btn delete-btn"
                onclick="deleteTask(${task.id})">

                ✕

                </button>

            </td>

        </tr>
        `;
    });

    document.getElementById("totalTasks")
    .textContent=tasks.length;

    document.getElementById("completedTasks")
    .textContent=completedCount;

    document.getElementById("pendingTasks")
    .textContent=
    tasks.length-completedCount;
}

function completeTask(id){

    tasks=tasks.map(task=>{

        if(task.id===id){

            task.status="Completed";
        }

        return task;
    });

    updateStorage();
}

function deleteTask(id){

    tasks=
    tasks.filter(
        task=>task.id!==id
    );

    updateStorage();
}

function updateStorage(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    renderTasks();
}

/* PROFILE */

function showProfile(){

    document
    .getElementById("profilePage")
    .style.display="flex";
}

function closeProfile(){

    document
    .getElementById("profilePage")
    .style.display="none";
}
function showAllTasks() {
    renderTasks();
}

function showCompletedTasks() {

    const table =
    document.getElementById("taskTable");

    table.innerHTML = "";

    const completed =
    tasks.filter(task =>
        task.status === "Completed"
    );

    completed.forEach(task => {

        table.innerHTML += `
        <tr>

            <td>${task.name}</td>
            <td>${task.date || "No Date"}</td>

            <td>
                <span class="status completed">
                    Completed
                </span>
            </td>

            <td class="${task.priority.toLowerCase()}">
                ${task.priority}
            </td>

            <td>
                <img
                class="assignee-avatar"
                src="https://i.pravatar.cc/40?img=12">
            </td>

            <td>
                <button
                class="action-btn delete-btn"
                onclick="deleteTask(${task.id})">

                ✕

                </button>
            </td>

        </tr>
        `;
    });
}

function showSettings() {

    alert(
        "Settings page coming soon 🚀"
    );
}

renderTasks();