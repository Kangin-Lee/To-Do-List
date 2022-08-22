// 유저가 값을 입력한다.
// + 버튼을 클릭하면, 할일이 추가된다.
// delete 버튼을 누르면 할일이 삭제 된다.
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다.
// Done 탭은 끝난 아이템만, not Done 탭은 진행중인 아이템만
// All 탭을 누르면 다시 전체 아이템으로 돌아온다.

let userInput = document.getElementById("user-input");
let plusBtn = document.getElementById("plus-btn");
let task = document.getElementById("task");
let taskList = [];
let tabs = document.querySelectorAll(".tabs div")
let tabMenu = "all";
let filterList;
let underLine = document.getElementById("under-line");

//enter 키를 눌렀을 때 list에 추가
userInput.addEventListener("keypress", function(event){
    if(event.key == "Enter"){
        event.preventDefault();
        plusBtn.click();
        userInput.value = "";
    }
});


for(let i = 1; i < tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)})
    tabs.forEach(menu=>menu.addEventListener("click",(e)=>Indicator(e)))
}

function Indicator(e){
    underLine.style.left = e.currentTarget.offsetLeft +"px";
    underLine.style.width = e.currentTarget.offsetWidth +"px";
    underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}

plusBtn.addEventListener("click", plus);

// list 저장
function plus(){
    let task = {
        id: randomId(),
        taskContent: userInput.value,
        isComplete: false
    }
    taskList.push(task);
    console.log(taskList);
    render();
}



//화면에 보여주기
function render(){
    let list = [];

    if(tabMenu == "all"){
        list = taskList;
    }else{
        list = filterList;
    }

    let resultHTML = '';

    for(let i = 0; i < list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task-area">
            <div id="task" class ="task-done">${list[i].taskContent}</div> 
            <div class="icon-box">
                <div onclick = "toggleComplete('${list[i].id}')"><i class="fa-solid fa-arrow-rotate-left"></i></div> 
                <div onclick = "deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></div>
            </div>
        </div>`
        }else{
            resultHTML += `<div class="task-area">
            <div id="task" >${list[i].taskContent}</div> 
            <div class="icon-box">
                <div onclick = "toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></div> 
                <div onclick = "deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></div>
            </div>
             </div>`
        }

       
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    console.log(taskList);
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}

function deleteTask(id){
    for(let i =0; i <taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
        
    }
    render();
}

function filter(event){
    tabMenu = event.target.id;

    filterList = []; 

    if(tabMenu == "all"){
        render();
    }else if(tabMenu == "not-done"){
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }
        render();
    }else if(tabMenu == "done"){
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

function randomId(){
    return ('_'+Math.random().toString(36).substr(2,9));
}




