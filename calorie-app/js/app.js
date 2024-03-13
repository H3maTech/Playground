class CalorieTracker {
    #calorieLimit = 2000;
    #totalCalories = 0;
    #meals = [];
    #workouts = [];

    constructor() {
        this.#displayCaloriesTotal();
        this.#displayCaloriesLimit();
        this.#displayCaloriesConsumed();
        this.#displayCaloriesBurned();
        this.#displayCaloriesRemaining()
    }

    addMeal(meal) {
        this.#meals.push(meal);
        this.#totalCalories += meal.calories;
        this.#displayNewItem(meal, 'meal');
        this.#render()
    }

    removeMeal(id) {
        const index = this.#meals.findIndex((meal) => meal.id === id);
        if (index !== -1) {
            this.#totalCalories -= this.#meals[index].calories
            this.#meals.splice(index, 1);
            this.#render();
        }
    }

    addWorkout(workout) {
        this.#workouts.push(workout);
        this.#totalCalories -= workout.calories;
        this.#displayNewItem(workout, 'workout');
        this.#render()
    }

    #displayCaloriesTotal() {
        const totalCaloriesEl = document.querySelector('#calories-total');
        totalCaloriesEl.innerHTML = this.#totalCalories;
    }

    #displayCaloriesLimit() {
        const calorieLimitEl = document.querySelector('#calories-limit');
        calorieLimitEl.innerHTML = this.#calorieLimit;
    }

    #displayCaloriesConsumed() {
        const caloriesConsumedEl = document.querySelector('#calories-consumed');
        const consumed = this.#meals.reduce((accumulator, meal) => accumulator + meal.calories, 0);
        caloriesConsumedEl.innerHTML = consumed;
    }

    #displayCaloriesBurned() {
        const caloriesBurnedEl = document.querySelector('#calories-burned');
        const burned = this.#workouts.reduce((accumulator, meal) => accumulator + meal.calories, 0);
        caloriesBurnedEl.innerHTML = burned
    }

    #displayCaloriesRemaining() {
        const caloriesRemainingEl = document.querySelector('#calories-remaining');
        const progressEl = document.querySelector('#calorie-progress');

        const remaining = this.#calorieLimit - this.#totalCalories;
        caloriesRemainingEl.innerHTML = remaining;

        const parent = caloriesRemainingEl.closest('.card');
        if (remaining <= 0) {
            parent.classList.remove('bg-light');
            parent.classList.add('bg-danger', 'text-white');
            progressEl.classList.remove('bg-success');
            progressEl.classList.add('bg-danger');
        } else {
            parent.classList.remove('bg-danger', 'text-white');
            parent.classList.add('bg-light');
            progressEl.classList.remove('bg-danger');
            progressEl.classList.add('bg-success');
        }
    }

    #displayCaloriesProgress() {
        const progressEl = document.querySelector('#calorie-progress');
        const percentage = (this.#totalCalories / this.#calorieLimit) * 100;
        const width = Math.min(percentage, 100);
        progressEl.style.width = `${width}%`;
    }

    #displayNewItem(item, type) {
        const itemsContainer = document.querySelector(`#${type}-items`);
        const itemEl = document.createElement('div');
        itemEl.classList.add('card', 'my-2');
        itemEl.setAttribute('data-id', item.id);
        itemEl.innerHTML = `
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
            <h4 class="mx-1">${item.name}</h4>
            <div
                class="fs-1 bg-${type === 'meal' ? 'primary' : 'secondary'} text-white text-center rounded-2 px-2 px-sm-5">
                ${item.calories}
            </div>
            <button class="delete btn btn-danger btn-sm mx-2">
                <i class="fa-solid fa-xmark"></i>
            </button>
            </div>
        </div>
        `;

        itemsContainer.appendChild(itemEl);
    }

    #render() {
        this.#displayCaloriesTotal();
        this.#displayCaloriesConsumed();
        this.#displayCaloriesBurned();
        this.#displayCaloriesRemaining()
        this.#displayCaloriesProgress();
    }
}

class Meal {
    constructor(name, calories) {
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories;
    }
}

class Workout {
    constructor(name, calories) {
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories;
    }
}

class App {
    constructor() {
        this.tracker = new CalorieTracker();
        document.querySelector('#meal-form').addEventListener('submit', this.#newItem.bind(this, 'meal'))
        document.querySelector('#workout-form').addEventListener('submit', this.#newItem.bind(this, 'workout'))
        document.querySelector('#meal-items').addEventListener('click', this.#removeItem.bind(this, 'meal'));
        document.querySelector('#workout-items').addEventListener('click', this.#removeItem.bind(this, 'workout'));
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
        new bootstrap.Collapse(collapseItem, {
            toggle: true
        });
    }

    #removeItem(type, e) {
        if (e.target.matches('.delete') || e.target.matches('.fa-xmark')) {
            if (confirm('Are you sure?')) {
                const item = e.target.closest('.card');

                type === 'meal'
                ? this.tracker.removeMeal(item.dataset.id)
                : this.tracker.removeWorkout(item.dataset.id);

                item.remove();
            }
        }
    }
}

const app = new App()