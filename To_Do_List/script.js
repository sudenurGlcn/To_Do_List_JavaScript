const task =document.querySelector("#task");
const list = document.querySelector("#list");
const liveToast = document.querySelector("#liveToast");
const button = document.querySelector("#liveToastBtn");

let items2 ;

//load items
loadItems();



EventListener();

function EventListener(){
    button.addEventListener("click", newElement);
}
function loadItems(){

    items2= getItemsFromLS();
    items2.forEach(function(item){
        createItem(item);
    });
}
//get items from local storage
function getItemsFromLS(){
    if(localStorage.getItem('items2') === null){
        items2 = [];
    }
    else{
        items2 = JSON.parse(localStorage.getItem('items2'));
    }
    return items2;

}

//set item to local storage
function setItemToLS(text){
    items2 = getItemsFromLS();
    items2.push(text);
    localStorage.setItem('items2', JSON.stringify(items2));
}

function removeItemFromLS(text){
    let textFinal=text.slice(0,-1);
    items2 = getItemsFromLS();
    items2.forEach(function(item, index){
        if(item === textFinal){
           items2.splice(index, 1);
          
        }
    });
    localStorage.setItem('items2', JSON.stringify(items2));
   
    
    
}


function createItem(text){
    const li = document.createElement("li");
    li.innerHTML = text;
    list.appendChild(li);
    $(`.success`).toast("show");

    let removeBtn = document.createElement("span");
    removeBtn.classList.add("close");

    let txt = document.createTextNode("\u00D7");
    removeBtn.appendChild(txt)

    li.appendChild(removeBtn);
    removeBtn.addEventListener("click", removeItem);

    li.addEventListener("click", selectItem);
}
//add a new Item
function newElement(){
    if(task.value == "" || !task.value.trim()) {
        $(`.error`).toast("show");
    }
    else{
        createItem(task.value);
        $(`.success`).toast("show");
        //save to local storage
        setItemToLS(task.value);
    }
   task.value = "";
     
}
//remove Item
function removeItem(e){
    let answer = window.confirm("kaldırmak istediğinizden emin misiniz?");
    if(answer){
        e.target.parentElement.remove();

        //remove from local storage
        removeItemFromLS(e.target.parentElement.textContent);
        console.log(e.target.parentElement.textContent);
    }

}

//select Item
function selectItem(e){
    e.target.classList.toggle("checked");
}




