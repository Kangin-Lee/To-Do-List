// 유저가 값을 입력한다.
// + 버튼을 클릭하면, 할일이 추가된다.
// delete 버튼을 누르면 할일이 삭제 된다.
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다.
// Done 탭은 끝난 아이템만, not Done 탭은 진행중인 아이템만
// All 탭을 누르면 다시 전체 아이템으로 돌아온다.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList=[];
let tabs = document.querySelectorAll(".task-tabs div");
let mode = 'all';
let filterList = [];
let underLine = document.getElementById("under-line");

for(let i = 1; i < tabs.length; i++){
    tabs[i].addEventListener("click",function(event){filter(event)} );
    tabs[i].addEventListener("click",(e)=>indicator(e));
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event){
    if(event.key == "Enter"){
        event.preventDefault();
        addButton.click();
    }
});


function addTask(){
    
    let taskContent = taskInput.value;

    let task ={
        id:randomIdGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    };
    taskList.push(task);
    console.log(taskList);
    render();
    taskInput.value = '';
}

function render(){
    let list = [];
    if(mode == "all"){
        list = taskList;
    }else if(mode == "not-done" || mode == "done"){
        list = filterList;
    }
    let resultHTML = ``;

    for(let i = 0; i < list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task">
        <div class = "task-done">${list[i].taskContent}</div> 
        <div>
            <button onclick = "toggleComplete('${list[i].id}')"><i class="fa-solid fa-arrow-rotate-left"></i></button>
            <button onclick = "deleteTask('${list[i].id}')" ><i class="fa-solid fa-trash-can"></i></button>
        </div>
        </div>`;
        }else{
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div> 
            <div>
                <button onclick = "toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                <button onclick = "deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
            </div>`;
        }
    }


    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}

function deleteTask(id){
    console.log("삭제",id);
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }
   render();
}


function filter(event){
    mode = event.target.id;
    
    if(mode == "all"){
        render();
    }else if(mode == "not-done"){
        for(let i =0; i < taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }render();
    }else if(mode == "done"){
        for(let i =0; i < taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            }
        }render();
    }
}

function randomIdGenerate(){
    return (performance.now().toString(36)+Math.random().toString(36)).replace(/\./g,"");
}

function indicator(e){
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = 
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight - 5 +"px";
}
