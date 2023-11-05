let taskInput = document.getElementById("task-input");
// console.log(taskInput);
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
// console.log(tabs)
let underLine = document.getElementById('under-line');
let taskList = []
let mode ="all";
let filterList = []

taskInput.addEventListener("keydown",function(e){
  if(e.keyCode ===13){
    addTask(e);
    taskInput.value=""
  }
})

tabs.forEach((menu)=>menu.addEventListener('click',indicator));
function indicator(e){
  underLine.style.left = e.currentTarget.offsetLeft + "px";
  underLine.style.width = e.currentTarget.offsetWidth + "px";
  underLine.style.top = e.currentTarget.offsetHeight + "px";
}

for(let i=1; i<tabs.length; i++){
  tabs[i].addEventListener('click',function(e){filter(e)})
}
function filter(e){
  // console.log(e.target.id)
  mode = e.target.id
  filterList =[]
  if(mode==='all'){
    render()
  }else if(mode==='ongoing'){
    for(let i=0; i<taskList.length; i++){
      if(taskList[i].isComplete===false){
        filterList.push(taskList[i])
      }
    }
    render()
  }else if(mode==='done'){
    for(let i=0; i<taskList.length; i++){
      if(taskList[i].isComplete===true){
        filterList.push(taskList[i])
      }
    }
    render()
  }
}

addButton.addEventListener('click',addTask);
function addTask(){
  let task={
    id:randomIDGenerate(),
    taskContent:taskInput.value,
    isComplete:false
  }
  taskList.push(task)
  // console.log(taskList)
  taskInput.value="";
  render();
}


function render(){
  let list =[]
  if(mode ==="all"){
    list = taskList;
  // }else if(mode ==="ongoing" || mode ==="done"){
  }else{
    list = filterList;
  }

  let resultHTML = '';
  for(let i=0; i<list.length; i++){
    if(list[i].isComplete===true){
      resultHTML +=`<div class="task">
      <div class="task-done">${list[i].taskContent}</div>
      <div>
        <button onclick="toggleComplete('${list[i].id}')">Check</button>
        <button onclick="deleteTask('${list[i].id}')">Delete</button>
      </div>
    </div>`
    }else{
      resultHTML += `<div class="task">
      <div>${list[i].taskContent}</div>
      <div>
        <button onclick="toggleComplete('${list[i].id}')">Check</button>
        <button onclick="deleteTask('${list[i].id}')">Delete</button>
      </div>
    </div>`
    }    
  }
  document.getElementById("task-board").innerHTML=resultHTML;
}


function toggleComplete(id){
  // console.log("checked")
  // console.log("id",id)
  for(let i=0; i<taskList.length; i++){
    if(taskList[i].id === id){
      taskList[i].isComplete = !taskList[i].isComplete
      break;
    }
  }
  render() 
  // console.log(taskList)
}
function deleteTask(id){
  // console.log("삭제하다")
  for(let i=0; i<taskList.length; i++){
    if(taskList[i].id === id){
      taskList.splice(i,1)

      for (let j = 0; j < filterList.length; j++) {
        if (filterList[j].id === id) {
          filterList.splice(j, 1);
          break;
        }
      }

      break;
    }
  }
  render()
  console.log(taskList) 
}

function randomIDGenerate(){
  return '_'+ Math.random().toString(36).substr(2,9);
}

