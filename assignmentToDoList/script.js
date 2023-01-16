const addButton = document.getElementById("addButton");
const taskListUl = document.getElementById("tasklist");

const createListInHTML = async () => {
  try {
    // ophalen huidige tasklist
    const currentTaskList = await getToDoTasks();
    // leegmaken ul
    while (taskListUl.firstChild) {
      taskListUl.removeChild(taskListUl.firstChild);
    }

    currentTaskList.forEach((task) => {
      // nieuwe li maken voor task
      const newTaskLi = document.createElement("li");
      taskListUl.appendChild(newTaskLi);

      // maak de checkbox
      const taskCheckbox = document.createElement("input");
      taskCheckbox.setAttribute("type", "checkbox");
      // zorg dat checkbox checked blijft
      if (task.done === true) {
        taskCheckbox.setAttribute("checked", true);
      }
      // wijs de id toe aan de checkbox
      taskCheckbox.setAttribute("id", task._id);
      taskCheckbox.setAttribute("class", "checkbox");
      newTaskLi.appendChild(taskCheckbox);
      taskCheckbox.addEventListener("click", updateTaskStatus);

      // task beschrijving met klikbare div eromheen
      const taskText = document.createTextNode(task.description);
      const textDiv = document.createElement("div");
      textDiv.appendChild(taskText);
      newTaskLi.appendChild(textDiv);
      textDiv.addEventListener("dblclick", renameTask);

      //maak de prullenbak
      const removeBin = document.createElement("img");
      removeBin.setAttribute("src", "trash.svg");
      // geef het id mee van de task aan de prullenbak
      removeBin.setAttribute("id", task._id);
      newTaskLi.appendChild(removeBin);
      removeBin.addEventListener("click", deleteTask);

      //if statement om de text door te strepen wanneer checkbox checked is
       if (task.done === true) {
        textDiv.style.textDecoration = "line-through";}
        if (task.done === false) {
            textDiv.style.textDecoration = "none";
        } 
      });
    
  } catch (error) {
    console.log(error);
  }
};

// zorgen dat de lijst in html staat bij openen pagina
createListInHTML();

// je hebt de waarde nodig die de user heeft ingevoerd
const addTask = async (event) => {
  const taskDescription = document.getElementById("input").value;
  await postTaskToData(taskDescription);
  createListInHTML();
};
addButton.addEventListener("click", addTask);

// doorsturen van true of false naar donestatus
const updateTaskStatus = async (event) => {
  await toggleDoneStatus(event.target.id, event.target.checked);
  createListInHTML()
};

// nodig in renameTask om op te slaan bij 'enter'
const saveEditedTaskDescription = async (event) => {
  if (event.key === "Enter") {
    // haal de nieuwe task beschrijving op (value van renameInputField)
    const newTaskDescription = event.target.value;
    // je hebt de id nodig maar die staat in de checkbox (of prullemand), dus je moet naar de parent (de li)
    // en daarna naar de firstchild (of lastchild) en daar de id van
    const newTaskDescriptionId = event.target.parentNode.firstChild.id;
    updateTaskInData(newTaskDescriptionId, newTaskDescription);
    createListInHTML();
  }
};

const renameTask = async (event) => {
  // Pak de textDiv
  const doubleClickTextDiv = event.currentTarget;
  // maak oude taskText leeg
  doubleClickTextDiv.innerHTML = "";
  // Pak de tekst zelf (nu leeg) maar nodig om de nieuwe taskDescription door te sturen
  const taskText = doubleClickTextDiv.innerHTML;
  // Pak de parent van de textDiv
  const liToAddInputFieldIn = event.currentTarget.parentNode;
  // Maak het input veld aan
  const renameInputField = document.createElement("input");
  renameInputField.setAttribute("type", "text");
  renameInputField.setAttribute("value", taskText);
  // Pak de prullenbak
  const removeBin = liToAddInputFieldIn.lastChild;
  // Voeg het input veld toe net voor de prullenbak
  liToAddInputFieldIn.insertBefore(renameInputField, removeBin);
  // event listener voor het input field om op te slaan bij 'enter' (zie functie hierboven)
  renameInputField.addEventListener("keyup", saveEditedTaskDescription);
};

//verwijderen van een task  obv id
const deleteTask = async (event) => {
  await deleteTaskFromData(event.target.id);
  createListInHTML();
};
