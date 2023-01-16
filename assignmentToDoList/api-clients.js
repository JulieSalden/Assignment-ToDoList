const baseUrl = "http://localhost:3000/";

// functie om huidige to do list op te halen
// je moet hier de data returnen omdat je deze nog wilt gebruiken in je script
const getToDoTasks = async () => {
  try {
    const toDoData = await fetch(baseUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const responseToDoData = await toDoData.json();
    return responseToDoData;
  } catch (error) {
    console.log(error);
  }
};

// functie om een nieuwe taak obv invoer user naar de DB te sturen
const postTaskToData = async (taskDescription) => {
  try {
    const postData = { description: `${taskDescription}`, done: false };
    await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
};

// functie om task uit de DB te halen obv task id
const deleteTaskFromData = async (deleteTaskId) => {
  try {
    const deleteTaskUrl = baseUrl + deleteTaskId;
    await fetch(deleteTaskUrl, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
};

// functie om de done property aan te passen obv task id dmv boolean van de checkbox
const toggleDoneStatus = async (updateTaskId, doneStatus) => {
  try {
    const updatedTaskStatus = { done: doneStatus };
    const updateTaskUrl = baseUrl + updateTaskId;
    await fetch(updateTaskUrl, {
      method: "PUT",
      body: JSON.stringify(updatedTaskStatus),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
};

// task updaten in DB obv taskid en nieuwe taskDescription
const updateTaskInData = async (updateTaskId, newTaskDescription) => {
  try {
    const updatedTaskDescription = { description: `${newTaskDescription}` };
    const updateTaskUrl = baseUrl + updateTaskId;
    await fetch(updateTaskUrl, {
      method: "PUT",
      body: JSON.stringify(updatedTaskDescription),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
};
