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

        const hideDoneTasksButton = document.querySelector(".js-taskItemHidden");
        hideDoneTasksButton.addEventListener("click", () => {
            hideDoneTasks = !hideDoneTasks;
            render();
        });

        if (toggleAllDoneButton !== null) {
            toggleAllDoneButton.addEventListener("click", markAllDone);
        };
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li
                    class="list__item js-task${task.done && hideDoneTasks ? " list__item-hidden" : ""}""
                >
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
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

    };

    const renderButton = () => {
        const buttonsContainer = document.querySelector(".js-buttons");
        const haveTasks = tasks.length > 0;
        const allTasksDone = tasks.every(task => task.done);

        const htmlAdditionalButtons = `
            <button class="section__button js-taskItemHidden">
             ${haveTasks ? (hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone") : ""}
            </button>
            <button class="section__button js-toggleAllDone"${allTasksDone ? " disabled" : ""}>
               ${haveTasks ? "Ukończ wszystkie" : ""}
            </button>
        `;

        buttonsContainer.innerHTML = htmlAdditionalButtons;
    };


    const render = () => {
        renderTasks();
        renderButton();

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