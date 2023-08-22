{

    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };


    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const bindEvents = () => {
        const removeButton = document.querySelectorAll(".js-remove");

        removeButton.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButtons, taskIndex) => {
            toggleDoneButtons.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const BindButtonsEvents = () => {
        const toggleAllTaskDone = document.querySelectorAll(".js-toggleAllTaskDone");
    }

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li
                    class="list__item js-task"
                >
                 <button class="list__button list__button--toggleDone js-toggleDone"> 
                    ${task.done ? "✔" : ""}
                 </button>
                 <span class="list__content${task.done ? " list__content--done" : ""}">${task.content}</span>
                 <button class="list__button list__button--remove  js-remove">
                  🗑
                 </button>
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    }

    const renderButtons = () => { 
        let htmlAdditionalButtons = "";

        for (const task of tasks) {
            htmlAdditionalButtons += `
            <button class="toggleAllTaskDoneButton toggleAllTaskDoneButtonDisabled js-toggleAllTaskDone">
                ${task.done ? "toggleAllTaskDoneButtonDisabled" : "toggleAllTaskDoneButton"}
            </button>
            `;
        }

        document.querySelector(".js-toggleAllTaskDone").innerHTML = htmlAdditionalButtons;
    }


    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
        BindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };


    init();
};