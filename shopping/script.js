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
                <input type="checkbox" value="${item.id}">
                <span class="itemName">${item.name}</span>
                <button class="btn btn--delete" aria-label="Remove ${item.name}">
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

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemUpdated', displayItems);
list.addEventListener('itemUpdated', mirrorToLocalStorage);

restoreFromLocalStorage();
