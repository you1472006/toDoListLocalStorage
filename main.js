let input= document.querySelector(".input");
let button = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let tasks =[];
let butdel= document.querySelector(".delButton");
let butdelall= document.querySelector(".delall");
if(window.localStorage.getItem("tasks")){

    tasks=JSON.parse(window.localStorage.getItem("tasks"));
    show();
}
document.addEventListener("click",function(e){
    if(e.target.classList.contains("delButton")){
        let parent =e.target.parentElement;
        
        removeE(parent.getAttribute("id"));
        show ();
        
        parent.remove();
        
    }
    else  if(e.target.classList.contains("task")){
        
        let ide=e.target.getAttribute('id');
        
        tasks.forEach(function(el){
            if(el.id==ide){
                if(el.done==="completed"){
                    el.done="notcompleted"
                }else{el.done="completed"}
            }
        })
        update();
        show();
    }
})
butdelall.onclick=function (){
    tasks=[];
    update();
    show();
}
button.onclick= function addTask(){
    if(input.value!=""){
    const task ={
        id : Date.now(),
        title : input.value,
        done: "notcompleted"
    };
    tasks.push(task);
    input.value="";
    
    show();
    update();
}
};

function show (){
    tasksDiv.innerHTML="";
    
    tasks.forEach(function(e,i){
        let taskP= document.createElement('div');
        taskP.innerHTML= ` ${i+1}. ${e.title}`;
        let del= document.createElement('span');
        del.innerHTML= "X";
        del.className="delButton";
        taskP.classList=`task ${e.done}`;
        taskP.setAttribute("id",e.id);
        taskP.append(del);
        tasksDiv.append(taskP);
        

    })
}
function update(){
    let jsonFile=JSON.stringify(tasks);
    window.localStorage.setItem("tasks",jsonFile);
}
function removeE(tid){
    tasks =tasks.filter((e) => e.id!=tid);
    update();
    
}




