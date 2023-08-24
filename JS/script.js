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
        tasks = tasks.map((task, index) =>
            index === taskIndex ? { ...task, done: !task.done } : task
        );
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

    const bindButtonsEvents = () => {

        const toggleAllTaskDone = document.querySelector(".js-toggleAllDone");

        toggleAllTaskDone.addEventListener("click", () => {
            
        })
    };

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
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButton = () => {
        let htmlAdditionalButtons = "";

        htmlAdditionalButtons += `
          <div class="js-buttons">
            <button class="section__button">Ukryj wszystkie</button>
            <button class="section__button js-toggleAllDone">Ukończ wszystkie</button>
          </div>
        `;

        document.querySelector(".js-buttons").innerHTML = htmlAdditionalButtons;
    };

    const render = () => {
        renderTasks();
        renderButton();

        bindEvents();
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