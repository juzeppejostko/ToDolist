function li_append() {
    let textInput = document.getElementById("input-task");
    if(textInput.value !==""){
        let elem = {
            checkbox: false,
            taskname: textInput.value
        }
        taskList.push(elem);
        textInput.value="";
        updatePage();
    }else {
        alert("To add the task type, the name of the task")
    }
}

function li_remove(e) {
    let get_id = e.parentElement.id;
    console.log(get_id)
    taskList.splice(Number(get_id), 1);
    updatePage();
}

function on_check(e) {
    let root = e.parentNode;
    let cur_span = root.querySelector('span');
    if (e.checked) {
        taskList[Number(root.id)].checkbox = true;
        updatePage();
    } else {
        taskList[Number(root.id)].checkbox = false;
        updatePage();
    }
}

let taskList = [{
    checkbox: false,
    taskname: "Email David"
}, {
    checkbox: false,
    taskname: "Create ideal user personal guide"
}, {
    checkbox: false,
    taskname: "Set up A/B test"
}];


function makeUL(array) {
    // Create the list element:
    let list = document.createElement('ul');
    list.setAttribute("id","task-list");

    for (let i = 0; i < array.length; i++) {
        // Create the list item:
        let item = document.createElement('li');

        // Set its contents:
        let n_button = document.createElement("button");
        n_button.classList.add("delete-btn");
        n_button.setAttribute("onclick", "li_remove(this)")
        //let node = document.createElement("LI");
        let n_span = document.createElement("span");
        n_span.classList.add("task");
        n_span.setAttribute("style", "text-decoration: none");
        n_span.innerHTML = array[i].taskname;
        let n_input = document.createElement("input");
        n_input.setAttribute("type", "checkbox");
        n_input.checked = array[i].checkbox;
        if (n_input.checked == true){
            n_span.setAttribute("style", "text-decoration: line-through");
        }
        n_input.setAttribute("onclick", "on_check(this)")
        //node.innerHTML = textInput.value;
        item.setAttribute("id",i);
        item.appendChild(n_input);
        item.appendChild(n_span);
        item.appendChild(n_button);


        // Add it to the list:
        list.appendChild(item);
    }
    return list;
}

function updatePage(){
    localStorage.setItem("tasks", JSON.stringify(taskList));
    document.getElementById('foo').innerHTML = '';
    taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    document.getElementById('foo').appendChild(makeUL(taskList));

}

// Finally, return the constructed list:
taskList = JSON.parse(localStorage.getItem("tasks")) || [];
updatePage();



