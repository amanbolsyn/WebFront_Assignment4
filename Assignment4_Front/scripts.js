document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");
    const errorMessage = document.getElementById("errorMessage");

    // Add task event listener
    addTaskButton.addEventListener("click", addTask);
    taskInput.addEventListener("input", toggleAddButton);
    taskList.addEventListener("click", handleTaskListClick);

    function addTask() {
        const taskText = taskInput.value.trim();

        if (!taskText) {
            showError("Please enter a task.");
            return;
        }

        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="btn btn-danger btn-sm delete-button" aria-label="Delete Task">Delete</button>
        `;
        taskList.appendChild(li);
        taskInput.value = ""; // Clear the input
        hideError();
        toggleAddButton();
    }

    function handleTaskListClick(event) {
        if (event.target.classList.contains("delete-button")) {
            const taskItem = event.target.parentElement;
            taskList.removeChild(taskItem);
        } else if (event.target.tagName === "SPAN") {
            event.target.classList.toggle("completed");
        }
    }

    function toggleAddButton() {
        addTaskButton.disabled = !taskInput.value.trim();
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function hideError() {
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
    }

    const changeColorButton = document.getElementById("changeColorButton");

    // Predefined colors array
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#9B59B6", "#E67E22", "#2ECC71" ,"#FFFFFF"];

    changeColorButton.addEventListener("click", changeBackgroundColor);

    function changeBackgroundColor() {
        // Generate a random color from the colors array
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.backgroundColor = randomColor;
    }


    function updateDateTime() {
        const now = new Date();
        const options = { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true 
        };
        const formattedDateTime = now.toLocaleString('en-US', options);
        document.getElementById('currentDateTime').innerText = `Current Date and Time: ${formattedDateTime}`;
    }
    
    // Call the function to display the date and time on page load
    updateDateTime();
    
    // Optionally, you can update the time every minute
    setInterval(updateDateTime, 60000);
});
