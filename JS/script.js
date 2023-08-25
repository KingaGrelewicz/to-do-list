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

    const markAllDone = () => {
        tasks = tasks.map(task => ({ ...task, done: !task.done }));
        render();
    };

    const toggleHideDoneTasks = (taskIndex) => {
        hideDoneTasks = hideDoneTasks.map((hideDoneTasks, index) =>
            index === taskIndex ? { ...hideDoneTasks, done: !hideDoneTasks.true } : hideDoneTasks
        );
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
    
        if (toggleAllDoneButton !== null) {
            toggleAllDoneButton.addEventListener("click", markAllDone);
        }

        const hideDoneTasksButton = document.querySelector(".js-taskItemHidden");
    
        if (hideDoneTasks === false) {
            hideDoneTasksButton.addEventListener("click", () => {
                hideTaskDone = true;
            });
        }
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
                  <span class="list__content${task.done ? " list__content--done section__button--hidden" : ""}">
                    ${task.content}
                  </span>
                 <button class="list__button list__button--remove  js-remove">
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
    
        const htmlAdditionalButtons = `
            <button class="section__button section__button--disabled js-toggleAllDone">
               ${haveTasks ? "Ukończ wszystkie" : ""}
            </button>
            <button class="section__button js-taskItemHidden">
               ${haveTasks ? "Ukryj wszystkie" : ""}
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