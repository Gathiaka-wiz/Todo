let Todos = [];
let finishedTodos = [];
const ctrlS = document.querySelectorAll('.ct');
const List = document.querySelector('.List');
const form =  document.querySelector("form");


// localStorage.removeItem('todos')
// localStorage.removeItem('finishedTodos')

// Dark mode Toggle
const LightDark = document.querySelector('.dark-light');
LightDark.addEventListener('click', (e) => {
    LightDark.querySelector('span').classList.toggle('right');
    document.body.classList.toggle('light')
});



// Get stored todo from local storage and  Ensure retrieved data is always an array
let storedTodos = JSON.parse(localStorage.getItem('todos'));
let storedFinTodos = JSON.parse(localStorage.getItem('finishedTodos'));
Todos = Array.isArray(storedTodos) ? storedTodos : []; 
finishedTodos = Array.isArray(storedFinTodos) ? storedFinTodos : []; 


// Toggle Add new todo 
document.querySelector(".newTodo").addEventListener('click', (e) => {
    if(!document.body.classList.contains('active')){
        document.body.classList.add('active');
        e.target.style.display = "flex";
    }
});

// Window control buttons functionality
ctrlS.forEach(ct => {
    ct.addEventListener('click', (e) => {
        switch (ct.id) {

            case "end" :
                e.target.parentElement.parentElement.classList.remove("maximize",  "minimize");
                if(document.body.classList.contains('active')){
                    document.body.classList.remove('active');
                    e.target.parentElement.parentElement.classList.add("remove");
                }else{
                    e.target.parentElement.parentElement.classList.toggle("remove");
                }
                break;

            case "max" :
                e.target.parentElement.parentElement.classList.remove("remove","minimize");
                e.target.parentElement.parentElement.classList.toggle("maximize");
                break;

            case "min" :
                e.target.parentElement.parentElement.classList.remove("maximize","remove","maximize" );
                e.target.parentElement.parentElement.classList.toggle("minimize");
                break;
            default:
                return;
                break;
        }
    })
});

// form data collection
form.addEventListener("submit" , (e) => {
    e.preventDefault();
    
    // Collect new todo data
    let newTodo = form.querySelector("input[name='todo']").value;

    // Add the new todo into the todos array
    if(Todos.length <= 0 ){
        Todos =  [newTodo];
    }else {
        Todos.push(newTodo);
    }


    form.querySelector("input[name='todo']").value = "";

    // Store all the todos in Local storage

    storeTodos();
    document.body.classList.toggle('active');
    
});


// Store todos function
const storeTodos = () => {
    Todos.length >= 1 ? localStorage.setItem('todos' , JSON.stringify(Todos)) : null;
    finishedTodos.length >= 1 ? localStorage.setItem('finishedTodos' , JSON.stringify(finishedTodos)) : null; 
    
    displayContent();
}

// Display all the todos in the main display
const  displayContent = () => {
    List.innerHTML = "<h2>Resources Links</h2>";
    if(Todos.length >= 1 ){
        Todos.forEach((element,key) => {
            const el = document.createElement('li');
            el.id = key;
            el.classList.add('not')
            // el.onclick = deleteElement(key);
            el.innerHTML = `${element} <button class="del" >Del</button>`;
            List.appendChild(el);
        })
    }
    if(finishedTodos.length >= 1){
        // console.log(finishedTodos)
        finishedTodos.forEach((element,key) => {
            const el = document.createElement('li');
            el.id = key;
            el.classList.add('fin');
            el.innerHTML = `< <span  ${element} <button class="del" >Del</button>`;
            List.appendChild(el);
        })
    }
    
    attachDeleteListeners()
    ADJ()
}


// Current todo completion

const ADJ =  () => {
    const listItems = document.querySelectorAll('li');

    
    listItems.forEach(el => {
        el.addEventListener('click', (e) => {
            let id  =  parseInt(e.target.id);

            if(e.target.classList.value == 'del'){
                return;
            }else{
                if (!e.target.classList.contains('fin')){
                    if(finishedTodos.length <= 0){
                        finishedTodos = [Todos[id]];  // Ensures it's an array
                        Todos.splice(id,1);
                        storeTodos();
                    }else {
                        finishedTodos.push(Todos[id]);
                        Todos.splice(id,1);
                        storeTodos();
                    }
                }else{
                    if(Todos.length <= 0){
                        Todos = [finishedTodos[id]];  // Ensures it's an array
                        finishedTodos.splice(id,1);
                        storeTodos();
                    }else {
                        Todos.push(finishedTodos[id]);
                        finishedTodos.splice(id,1);
                        storeTodos();
                    }
                }
            }

        });
    });

}


// Delete Todo 
const attachDeleteListeners = () => {
    document.querySelectorAll('.del').forEach((btn) => {
        if(!btn.parentElement.classList.contains('fin')){
            btn.addEventListener("click", (e) => {
                let id = parseInt(e.target.parentElement.id);
                Todos.splice(id,1);
                storeTodos();
            })
        }else{
            btn.addEventListener("click", (e) => {
                let id = parseInt(e.target.parentElement.id);
                finishedTodos.splice(id,1);
                storeTodos();
            })

        }
    });
}



displayContent();
