const BASE_URL = 'http://localhost:3000';
const getTodoItems = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/todos?page=20&pageSize=10`);
    const todoItems = response.data;
    console.log("hihi", todoItems);
    showData(todoItems)
    return todoItems;
  } catch (errors) {

    console.error(errors);

  }
};
function showData(todoItems){
    let table =`
    <thead class="thead-light">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  `
  if (Array.isArray(todoItems) && todoItems.length > 0) {
    todoItems.map(todoItem => {
  table+=`
    <tr>
      <td>${todoItem.title}</td>
      <td>
      <button type="button" class="btn btn-warning">Edit</button>
      <button  type="button" class="btn btn-danger">Delete</button>
      </td>
    </tr>
    `
   document.getElementById('table').innerHTML=table
  todoItem.onclick = async event => await removeTodoElement(event, todoItem);

  } )
} 
else  {
  let tbTable = document.getElementById("table")
  let newTitle = document.createElement("tr")
  console.log("new title 1", newTitle)
  newTitle.innerHTML = `
  <td>${todoItems.title}</td>
  <td>
  <button type="button" class="btn btn-warning">Edit</button>
  <button  type="button" class="btn btn-danger">Delete</button>
  </td>
  `
  tbTable.appendChild(newTitle)
  // newTitle.onclick = async event => await removeTodoElement(event, newTitle);
    }
  }
const main = async () => {
  
    showData(await getTodoItems());
  
  };
  main();

const form = document.querySelector('form');

form.addEventListener('submit', async event => {

  event.preventDefault();

  const title = document.querySelector('#new-todos__title').value;
  const todoItem = {

    userId: 1,

    id:205,

    title: title,

    completed: false

  };

  const submitTodoItem = await addTodoItem(todoItem);
  console.log("submit",submitTodoItem)
  showData(submitTodoItem);
  console.log(showData(submitTodoItem))
  form.reset(title)

});
const addTodoItem = async todoItem => {
  try {
  
      const response = await axios.post(`${BASE_URL}/api/todos`, todoItem);

      const newTodoItem = response.data;
      console.log("new to do", newTodoItem);
    return newTodoItem;

  } catch (errors) {

    console.error(errors);

  }
}
const deleteTodoItem = async id => {

  try {

    const response = await axios.delete(`${BASE_URL}/todos/${id}`);

    return response.data;

  } catch (errors) {

    console.error(errors);

  }

};
const removeTodoElement = async (event, element) => {

  event.target.parentElement.removeChild(element);

  const id = element.id;
  console.log(element.id);

  await deleteTodoItem(id);

};

