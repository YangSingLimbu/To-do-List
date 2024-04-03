const currentDate = new Date();
const dayAndDate = currentDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric' }).split(" ").reverse().join(", ");
const monthName = currentDate.toLocaleDateString('en-US', { month: 'long' });

document.querySelector("h1").innerText = dayAndDate;
document.querySelector("h3").innerText = monthName;
var listItems = []; 

document.querySelector("#add").addEventListener("click", addList);

document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addList();
    }
});

// Load the todo items from local storage when the page loads

window.onload = function() {
    var storedItems = localStorage.getItem("todo_items");
    if (storedItems) {
        listItems = JSON.parse(storedItems);
        // Clear the existing list displayed on the page
        document.getElementById("list").innerHTML = "";
        // Iterate over the stored todo items and display them
        listItems.forEach(function(item) {
            createListItem(item);
        });
    }
}        


function addList() {
    var todo = document.querySelector("#todo");
    var todoInput = todo.value.trim();

    if (todoInput === "") {
        return;
    }

    // Add the new todo item to the listItems array
    listItems.push(todoInput);

    // Save the updated listItems array to local storage
    localStorage.setItem("todo_items", JSON.stringify(listItems));

    // Create and display the new list item
    createListItem(todoInput);

    todo.value = "";

}

function createListItem(todoInput) {
    var li = document.createElement("li");
    var checkbox = document.createElement("input");
    var textInput = document.createElement("span");
    var edit = document.createElement("button");
    var remove = document.createElement("button")
    var removeIcon = document.createElement("i")
    var editIcon = document.createElement("i")
    
    checkbox.type = "checkbox";
    textInput.textContent = todoInput;
    edit.className = "edit"
    remove.className = "remove"

    removeIcon.classList.add("fa-solid", "fa-trash")
    remove.appendChild(removeIcon)

    editIcon.classList.add("fa-solid", "fa-pen-to-square")
    edit.appendChild(editIcon)



    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            textInput.style.textDecoration = "line-through"; 
            textInput.style.textDecorationThickness = "0.15rem";
    

            var index = listItems.indexOf(todoInput);
            if (index > -1) {
                listItems.splice(index, 1);
            }
        } else {
            textInput.style.textDecoration = "none"; 
            listItems.push(todoInput);
        }
        localStorage.setItem("todo_items", JSON.stringify(listItems));
    });

    
    edit.addEventListener("click", function() {
        var newText = prompt("Edit the todo item:", todoInput);
        if (newText !== null) {
            var index = listItems.indexOf(todoInput);
            if (index !== -1) {
                listItems[index] = newText.trim();
                localStorage.setItem("todo_items", JSON.stringify(listItems));
                // Update the text content of the corresponding span element
                textInput.textContent = listItems[index];
            }
        }
    });
    

    remove.addEventListener("click", function() {
        li.remove();
    
        var index = listItems.indexOf(todoInput);
        if (index !== -1) {
            listItems.splice(index, 1);
            localStorage.setItem("todo_items", JSON.stringify(listItems));
        }
    });
    
    li.appendChild(checkbox);
    li.appendChild(textInput);
    li.appendChild(edit);
    li.appendChild(remove);

    document.getElementById("list").appendChild(li);
}

document.querySelector(".clear").addEventListener("click", function() {

    const userConfirm = confirm("Do you want ot clear all todos?");
    if(userConfirm) {      
        localStorage.clear();
        location.reload();
    }
})