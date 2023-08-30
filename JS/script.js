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
        tasks = tasks.filter((_, index) => index !== taskIndex);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) =>
            index === taskIndex ? { ...task, done: !task.done } : task
        );
        render();
    };

    const markAllDone = () => {
        tasks = tasks.map(task => ({
            ...task,
            done: true,
        }));

        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    }

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButtons, taskIndex) => {
            toggleDoneButtons.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const bindButtonsEvents = () => {
        const toggleAllDoneButton = document.querySelector(".js-toggleAllDone");
        
        if (toggleAllDoneButton) {
            toggleAllDoneButton.addEventListener("click", markAllDone);
        };

        const toggleHideDoneTasksButton = document.querySelector(".js-taskItemHidden");
        
        if (toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks)
         };
    };

    const renderTasks = () => {
        const tasksToHTML = task => `
                <li class="
                 list__item${task.done && hideDoneTasks ? " list__item--hidden" : ""} js-task" 
                ">
                 <button class="list__button list__button--toggleDone js-toggleDone"> 
                    ${task.done ? "✔" : ""}
                 </button>
                  <span class="list__content${task.done ? " list__content--done" : ""}">
                    ${task.content}
                  </span>
                 <button class="list__button list__button--remove js-remove">
                  🗑
                 </button>
                </li>
            `;

        const tasksElement = document.querySelector(".js-tasks")
        tasksElement.innerHTML = tasks.map(tasksToHTML).join("");
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
            <button class="section__button js-taskItemHidden">
             ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button 
             class="section__button js-toggleAllDone"
            ${tasks.every(({ done }) => done) ? " disabled" : ""}
            >
              Ukończ wszystkie
            </button>
        `;
    };


    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
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