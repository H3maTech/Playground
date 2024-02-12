const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');
const itemsUpdatedEvent = new CustomEvent('itemsUpdate')

// We need an array to hold our state
let items = [];

function handleSubmit(e) {
    e.preventDefault();

    const name = e.currentTarget.item.value;
    if (!name) return;

    const item = {
        name,
        id: Date.now(),
        complete: false,
    };
    // Push the item into our state
    items.push(item);
    // Clear the form
    e.target.reset();
    // fire off a custom event that will tell anyone else who carse that the items have been updated
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
    // e.stopPropagation();
}

function displayItems() {
    console.log(items);
    const html = items.map(item => `<li class="shopping-item">
    <input
        value="${item.id}"
        type="checkbox"
        ${item.complete ? 'checked' : ''}>
    <span class="itemName">${item.name}</span>
    <button
        aria-label="Remove ${item.name}"
        value="${item.id}">
            &times;
        </button>
    </li>`).join('');
    list.innerHTML = html;
}

function mirrorToLocalStorage() {
    console.info('Saving items to local storage');
    localStorage.setItem('items', JSON.stringify(items))
}

function restoreFromLocalStorage() {
    console.log('Restoring from LS');
    // pull the items from LS
    const lsItems = JSON.parse(localStorage.getItem('items'));
    if (lsItems.length) {
        // items = lsItems;
        // lsItems.forEach(item => items.push(item));
        items.push(...lsItems);
        list.dispatchEvent(new CustomEvent('itemsUpdated'))
    }
}

function deleteItem(id) {
    console.log('DELETING ITEM', id);
    // update our items array without this one
    items = items.filter(item => item.id !== id)
    list.dispatchEvent(new CustomEvent('itemsUpdated'))
}

function markAsComplete(id) {
    const itemRef = items.find(item => item.id === id);
    itemRef.complete = !itemRef.complete;
    list.dispatchEvent(new CustomEvent('itemsUpdated'))
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);
// Event Delegation: We listen for the click on the list <ul> but then delegate the click over the button if that what was clicked</ul>
list.addEventListener('click', function(e) {
    const id = parseInt(e.target.value);

    if (e.target.matches('button')) {
        deleteItem(parseInt(id));
    }

    if (e.target.matches('input[type="checkbox"]')) {
        markAsComplete(id);
    }
})

restoreFromLocalStorage();
