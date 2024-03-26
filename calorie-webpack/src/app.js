import '@fortawesome/fontawesome-free/js/all'
import { Modal, Collapse } from 'bootstrap'
import './css/bootstrap.css'
import CalorieTracker from './Tracker'
import { Meal, Workout } from './Item'

class App {
    constructor() {
        this.tracker = new CalorieTracker();
       this.#loadEventListeners();
        this.tracker.loadItems();
    }

    #loadEventListeners() {
        document
        .querySelector('#meal-form')
        .addEventListener('submit', this.#newItem.bind(this, 'meal'))
        document
            .querySelector('#workout-form')
            .addEventListener('submit', this.#newItem.bind(this, 'workout'))
        document
            .querySelector('#meal-items')
            .addEventListener('click', this.#removeItem.bind(this, 'meal'));
        document
            .querySelector('#workout-items')
            .addEventListener('click', this.#removeItem.bind(this, 'workout'));
        document
            .querySelector('#filter-meals')
            .addEventListener('keyup', this.#filterItems.bind(this, 'meal'))
        document
            .querySelector('#filter-workouts')
            .addEventListener('keyup', this.#filterItems.bind(this, 'workout'))
        document
            .querySelector('#reset')
            .addEventListener('click', this.#reset.bind(this));
        document
            .querySelector('#limit-form')
            .addEventListener('submit', this.#setLimit.bind(this));
    }

    #newItem(type, e) {
        e.preventDefault();

        const name = document.querySelector(`#${type}-name`)
        const calories = document.querySelector(`#${type}-calories`)

        if (name.value === '' || calories.value === '' || name.value === ' ') {
            alert('Please fill in all fields');
            return;
        }

        type === 'meal'
        ? this.tracker.addMeal(new Meal(name.value, +calories.value))
        : this.tracker.addWorkout(new Workout(name.value, +calories.value));

        name.value = '';
        calories.value = '';
        const collapseItem = document.querySelector(`#collapse-${type}`);
        new Collapse(collapseItem, {
            toggle: true
        });
    }

    #removeItem(type, e) {
        if (e.target.matches('.delete') || e.target.matches('.fa-xmark')) {
            if (confirm('Are you sure?')) {
                const item = e.target.closest('.card');

                type === 'meal'
                ? this.tracker.removeItem(item.dataset.id, 'meal')
                : this.tracker.removeItem(item.dataset.id, 'workout');

                item.remove();
            }
        }
    }

    #filterItems(type, e) {
        const text = e.target.value.toLowerCase();
        document.querySelectorAll(`#${type}-items .card`).forEach(item => {
            const name = item.firstElementChild.firstElementChild.textContent;

            name.toLowerCase().indexOf(text) !== -1
            ? item.style.display = 'block'
            : item.style.display = 'none';
        })
    }

    #reset() {
        this.tracker.reset();
        document.querySelector('#meal-items').innerHTML = '';
        document.querySelector('#workout-items').innerHTML = '';
        document.querySelector('#filter-meals').value = '';
        document.querySelector('#filter-workouts').value = '';
    }

    #setLimit(e) {
        e.preventDefault();
        const limit = document.querySelector('#limit');
        if (limit.value === '') {
            alert('Please add a limit');
            return;
        }

        this.tracker.setLimit(+limit.value);
        limit.value = '';
        const modalEl = document.querySelector('#limit-modal');
        const modal = Modal.getInstance(modalEl);
        modal.hide();
    }
}

const app = new App()