// ****** SELECT ITEMS **********

const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option

let editElement;
let editFlag = false;
let editID = '';

// ****** FUNCTIONS **********

const addItem = e => {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();

    if (value && !editFlag) {
        createListItem(id,value);

        // display alert
        displayAlert('item added to the list', 'success');

        // show container
        container.classList.add('show-container');
        // add to local storage
        addToLocalStorage(id,value);
        // set back to default
        setBackToDefault();

    } else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert('value changed', 'success');
        // edit local storage
        editLocalStorage(editID,value);
        setBackToDefault();
    } else {
        displayAlert('please enter value', 'danger')
    }
}

// display alert

const displayAlert = (text,action) => {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    // remove alert
    setTimeout(() => {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    },1000)
}

// set back to default

const setBackToDefault = () => {
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'submit';
}

// clear items

const clearItems = () => {
    const items = document.querySelectorAll('.grocery-item');

    if (items.length > 0) {
        items.forEach(item => {
            list.removeChild(item);
        })
        console.log('list cleared');
    }
    container.classList.remove('show-container');
    displayAlert('empty list', 'danger');
    setBackToDefault();
    localStorage.removeItem('list');
}

// delete item

const deleteItem = (e) => {
    // console.log('item deleted');
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if (list.children.length === 0) {
        container.classList.remove('show-container');
    }
    displayAlert('item removed', 'danger');
    setBackToDefault();
    // remove from local storage
    removeFromLocalStorage(id);
}

// edit item

const editItem = (e) => {
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // set form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = 'edit';
}

// ****** LOCAL STORAGE **********

const addToLocalStorage = (id,value) => {
    // console.log('added to local storage');
    const grocery = {id,value};
    let items = getLocalStorage();

    // console.log(items);
    items.push(grocery);
    localStorage.setItem('list',JSON.stringify(items));
    // console.log(items);
}

const removeFromLocalStorage = id => {
    let items  = getLocalStorage();
    items = items.filter(item => {
        if(item.id !== id) {
            return item;
        }
    });
    localStorage.setItem('list',JSON.stringify(items));
}

const editLocalStorage = (id,value) => {
    let items = getLocalStorage();
    console.log(items);
    items = items.map(item => {
        if (item.id === id) {
            item.value = value;
        }
        return item;
    })
    localStorage.setItem('list',JSON.stringify(items));
}

const getLocalStorage = () => {
    return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
}

const createListItem = (id,value) => {
    const element = document.createElement('article');
    // add class
    element.classList.add('grocery-item');
    // add ID
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class="title">${value}</p>
                        <div class="btn-container">
                        <button type="button" class="edit-btn">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button type="button" class="delete-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                        </div>`;

    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');

    deleteBtn.addEventListener('click', deleteItem);
    editBtn.addEventListener('click', editItem);
    
    // append child
    list.appendChild(element);
}

// ****** SETUP ITEMS **********

const setupItems = () => {
    let items = getLocalStorage();
    if (items.length > 0) {
        items.forEach(item => {
            createListItem(item.id,item.value);
        })
        container.classList.add('show-container');
    }
}



// ****** EVENT LISTENERS **********

// submit form
form.addEventListener('submit', addItem);

// clear items
clearBtn.addEventListener('click', clearItems);

// load items
window.addEventListener('DOMContentLoaded', setupItems);