'use strict'
const brightColors = [
    '#fef752', '#51e8ff', '#ff7e5f', '#7df754',
    '#f46eff', '#3fd9d5', '#ffac41', '#68a8e3', '#ffa07a',
    '#ffcc29', '#4caf50', '#ff5252', '#ffc107', '#03a9f4',
    '#e91e63', '#8bc34a', '#ff9800', '#cddc39', '#ffc0cb',
    '#00bcd4', '#4caf50', '#2196f3', '#ffeb3b', '#00e676',
    '#ffffff', '#f84141'
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
let firstList = todoBody.firstElementChild;
let arr = [];

function addItem(inp) {
    const list = document.createElement('div');
    list.classList.add('list');
    list.innerHTML = `  <div class="left">
                            <p>${inp}</p>
                            <form class="checkbox">
                                <input class="check" type="checkbox">
                            </form>
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

    //to add list at the top
    arr.unshift(list);
    addList(arr);
    hideUp();
    hideDown();
}

// to add list in todo-body
function addList(arr) {
    todoBody.innerHTML = '';
    arr.forEach(list => {
        todoBody.appendChild(list);
    });
}


//to hide up or down button
function hideUp() {
    arr.forEach(ele => {
        if (!ele.classList.contains('checked')) {
            const eachList = ele.lastElementChild.lastElementChild;
            eachList.style.display = 'block';
        }
    });

    const topList = arr[0].lastElementChild.lastElementChild;
    topList.style.display = 'none';
}


// up, down, delete and edit 
const up = document.querySelectorAll('.up');
const down = document.querySelectorAll('.down');

todoBody.addEventListener('click', (e) => {
    let clicked = e.target;
    const parent = clicked.parentElement.parentElement;
    let upperList = parent.previousElementSibling;
    let downList = parent.nextElementSibling;

    if (clicked.classList.contains('up')) {
        upOrDown(upperList, clicked);
    } else if (clicked.classList.contains('down')) {
        upOrDown(downList, clicked);
    } else if (clicked.classList.contains('delete')) {
        const indexToRemove = arr.indexOf(parent);
        if (indexToRemove !== -1) {
            arr.splice(indexToRemove, 1);
        }
        parent.remove();
        hideDown();
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
    hideUp();
    hideDown();
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

    input.addEventListener('blur', () => {
        update();
    })

    input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            update();
        }
    })

    function update() {
        let text = input.value;
        input.replaceWith(pTag);
        pTag.innerText = text;
        pTag.classList.remove('inp');
    }
}

// checkbox
todoBody.addEventListener('click', (e) => {
    const checkbox = e.target;
    if (checkbox.classList.contains('check')) {
        const parentList = checkbox.parentElement.parentElement.parentElement;
        parentList.style.backgroundColor = 'lightgray';
        parentList.classList.add('checked');

        const lastEle = parentList.lastElementChild;
        const lastFirstEle = lastEle.firstElementChild;
        const lastLastEle = lastEle.lastElementChild;
        const editLastEle = lastLastEle.previousElementSibling;

        const firstEle = parentList.firstElementChild;
        const midEle = firstEle.lastElementChild;

        const text = firstEle.firstElementChild;

        lastFirstEle.style.display = 'none';
        lastLastEle.style.display = 'none';
        editLastEle.style.display = 'none';
        midEle.style.display = 'none';
        text.style.textDecoration = 'line-through';

        let inLast = parentList;
        for (let list of arr) {
            if (list === parentList) {
                arr.splice(arr.indexOf(list), 1);
                break;
            }
        }
        arr.push(inLast);
        addList(arr);   //to add list in todo-body
        hideUp();       //to hide up button
        hideDown();     //to hide down button
    }
})

function hideDown() {
    const lastEle = arr[arr.length - 1];
    
    for (let ele of arr) {
        ele.lastElementChild.firstElementChild.style.display = 'block';
        if (ele.classList.contains('checked')) {
            const list = ele.lastElementChild.firstElementChild;
            list.style.display = 'none';
            ele.previousElementSibling.lastElementChild.firstElementChild.style.display = 'none';
            break;
        }
    };
    
    lastEle.lastElementChild.firstElementChild.style.display = 'none';
}




