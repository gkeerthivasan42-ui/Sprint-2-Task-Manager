// ==========================================
// Task Class
// ==========================================

class Task {

    constructor(id, title, description, priority) {

        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
    }

    // Class function to display task information
    getTaskDetails() {

        return {
            id: this.id,
            title: this.title,
            description: this.description,
            priority: this.priority
        };
    }
}


// ==========================================
// Task Manager Class
// ==========================================

class TaskManager {

    constructor() {

        // Array to store all tasks
        this.tasks = [];

        // Starting task ID
        this.nextId = 1;
    }


    // ==========================================
    // Add Task
    // ==========================================

    addTask(title, description, priority) {

        // Create a new Task object
        const task = new Task(
            this.nextId,
            title,
            description,
            priority
        );

        // Store task object inside array
        this.tasks.push(task);

        // Increment ID for next task
        this.nextId++;

        // Display updated task list
        this.displayTasks();
    }


    // ==========================================
    // Delete Task
    // ==========================================

    deleteTask(taskId) {

        // Find the task using its ID
        const taskIndex = this.tasks.findIndex(
            task => task.id === taskId
        );

        // Check whether task exists
        if (taskIndex !== -1) {

            // Remove task from array
            this.tasks.splice(taskIndex, 1);

            // Display updated task list
            this.displayTasks();
        }
    }


    // ==========================================
    // Display Tasks
    // ==========================================

    displayTasks() {

        const taskList = document.getElementById("taskList");

        // Clear existing task cards
        taskList.innerHTML = "";

        // Check if there are no tasks
        if (this.tasks.length === 0) {

            taskList.innerHTML =
                '<div class="no-task">No tasks available.</div>';

            return;
        }


        // Loop through task array
        this.tasks.forEach(task => {

            // Create task card
            const taskCard = document.createElement("div");

            taskCard.className = "task-card";

            taskCard.innerHTML = `
                <h3>${task.title}</h3>

                <p class="task-id">
                    Task ID: ${task.id}
                </p>

                <p>
                    Description: ${task.description}
                </p>

                <p class="priority">
                    Priority: ${task.priority}
                </p>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})"
                >
                    Delete
                </button>
            `;

            // Add card to task list
            taskList.appendChild(taskCard);
        });
    }
}


// ==========================================
// Create Task Manager Object
// ==========================================

const taskManager = new TaskManager();


// ==========================================
// Add Task Function
// ==========================================

function addTask() {

    // Get values from HTML inputs
    const title =
        document.getElementById("taskTitle").value.trim();

    const description =
        document.getElementById("taskDescription").value.trim();

    const priority =
        document.getElementById("taskPriority").value;


    // Validate input
    if (
        title === "" ||
        description === "" ||
        priority === ""
    ) {

        alert("Please enter all task details.");

        return;
    }


    // Add task to TaskManager
    taskManager.addTask(
        title,
        description,
        priority
    );


    // Clear form fields
    document.getElementById("taskTitle").value = "";

    document.getElementById("taskDescription").value = "";

    document.getElementById("taskPriority").value = "";
}


// ==========================================
// Delete Task Function
// ==========================================

function deleteTask(taskId) {

    // Convert ID to number
    taskId = Number(taskId);

    // Delete task using TaskManager
    taskManager.deleteTask(taskId);
}


// ==========================================
// Display Initial Task List
// ==========================================

taskManager.displayTasks();