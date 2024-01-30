'use strict'
const brightColors = [
    '#fef752', '#51e8ff', '#ff7e5f', '#7df754',
    '#f46eff', '#3fd9d5', '#ffac41', '#68a8e3', '#ffa07a',
    '#ffcc29', '#4caf50', '#ff5252', '#ffc107', '#03a9f4',
    '#e91e63', '#8bc34a', '#ff9800', '#cddc39', '#ffc0cb',
    '#00bcd4', '#4caf50', '#2196f3', '#ffeb3b', '#00e676',
    '#ffffff','#f84141'
];
let i = 0;

const submit = document.querySelector('.submit');
const input = document.querySelector('input');

submit.addEventListener('click', (e) => {
    e.preventDefault();
    let inp = input.value;
    input.value = "";
    addItem(inp);
})



// add item in todo-body
const todoBody = document.querySelector('.todo-body');

function addItem(inp) {
    const list = document.createElement('div');
    list.classList.add('list');
    list.innerHTML = `  <div class="left">
                            <p>${inp}</p>
                        </div>
                        <div class="right">
                            <img class="down" src="./assets/down-circle-svgrepo-com.svg" alt="">
                            <img class="delete" src="./assets/trash-can-svgrepo-com.svg" alt="">
                            <img class="edit" src="./assets/edit-1483-svgrepo-com.svg" alt="">
                            <img class="up" src="./assets/up-circle-svgrepo-com.svg" alt="">
                        </div>
    `
    list.style.backgroundColor = brightColors[i % brightColors.length];
    i++;
    i > brightColors.length ? i = 1 : i;

    todoBody.append(list);
}



// up, down, delete and edit 
const up = document.querySelectorAll('.up');
const down = document.querySelectorAll('.down');

todoBody.addEventListener('click', (e) => {
    let clicked = e.target;
    let upperList = clicked.parentElement.parentElement.previousElementSibling;
    let downList = clicked.parentElement.parentElement.nextElementSibling;

    if (clicked.classList.contains('up')) {
        upOrDown(upperList, clicked);
    } else if (clicked.classList.contains('down')) {
        upOrDown(downList, clicked);
    } else if (clicked.classList.contains('delete')) {
        clicked.parentElement.parentElement.remove();
    } else if (clicked.classList.contains('edit')) {
        editInp(clicked);
    }
})

// move up or down function
function upOrDown(btnClicked, clicked) {
    let currList = clicked.parentElement.parentElement;
    let temp = currList.innerHTML;
    let tempClr = currList.style.backgroundColor;

    if (btnClicked != null) {
        currList.innerHTML = btnClicked.innerHTML;
        btnClicked.innerHTML = temp;
        currList.style.backgroundColor = btnClicked.style.backgroundColor;
        btnClicked.style.backgroundColor = tempClr;
    }
}

// edit function
function editInp(clicked) {
    let pTag = clicked.parentElement.previousElementSibling.querySelector('p');
    let text = pTag.innerText;

    let input = document.createElement('input');
    input.classList.add('inp')
    input.value = text;
    pTag.replaceWith(input);
    input.focus();

    input.addEventListener('blur',()=>{
        update();
    })

    input.addEventListener('keyup', (e)=>{
        if(e.key === 'Enter'){
            update();
        }
    })

    function update(){
        let text = input.value;
        input.replaceWith(pTag);
        pTag.innerText = text;
        pTag.classList.remove('inp');
    }
}



