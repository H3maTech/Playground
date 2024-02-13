const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// We need to store our state
let items = [];
function handleSubmit(e) {

    e.preventDefault();
    const name = e.target.item.value;

    if(!name) return

    const item = {
        id: Date.now(),
        name,
        complete: false,
    }
    // Push the items into our state
    items.push(item);
    // Clean the form
    e.target.reset();
    list.dispatchEvent(new CustomEvent('itemUpdated'))
}

function displayItems() {
    const html = Array.from(items).map(item => {
        return `
            <li class="shopping-item">
                <input type="checkbox" value="${item.id}" ${item.complete ? 'checked' : ''}>
                <span class="itemName">${item.name}</span>
                <button class="btn btn--delete" value="${item.id}" aria-label="Remove ${item.name}">
                    &times;
                </button>
            </li>
        `
    }).join('')

    list.innerHTML = html;
}

function mirrorToLocalStorage() {
    console.log('Adding to local storage...');
    localStorage.setItem("items", JSON.stringify(items));
}

function restoreFromLocalStorage() {
    // pull the items from local storage
    const lsItems = JSON.parse(localStorage.getItem("items"));
    if (lsItems?.length) {
        items.push(...lsItems)
        list.dispatchEvent(new CustomEvent("itemUpdated"));
    }
}

function deleteItem(id) {
    console.log('Deleting Item', id);
    // Update our list exclude this one
    items = items.filter(item => item.id !== id)
    list.dispatchEvent(new CustomEvent('itemUpdated'))
}

function markAsComplete(id) {
    console.log('Marking as complete', id);
    const itemRef = items.find(item => item.id === id)
    itemRef.complete = !itemRef.complete;
    list.dispatchEvent(new CustomEvent('itemUpdated'))
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemUpdated', displayItems);
list.addEventListener('itemUpdated', mirrorToLocalStorage);
// Event Delegation: We listen for the click on the list <ul>but then delegate the click over the button if that is what was clicked</ul>
list.addEventListener('click', function(e) {
    const id = parseInt(e.target.value);
    if (e.target.matches('button')) {
        deleteItem(id);
    }

    if (e.target.matches('input[type="checkbox"]')) {
        markAsComplete(id);
    }
});

restoreFromLocalStorage();
