import Storage from './Storage'

class CalorieTracker {
    #calorieLimit = Storage.getCalorieLimit();
    #totalCalories = Storage.getTotalCalories(0);
    #meals = Storage.getItems('meals');
    #workouts = Storage.getItems('workouts');

    constructor() {
        this.#displayCaloriesTotal();
        this.#displayCaloriesLimit();
        this.#displayCaloriesConsumed();
        this.#displayCaloriesBurned();
        this.#displayCaloriesRemaining()

        document.querySelector('#limit').value = this.#calorieLimit;
    }

    addMeal(meal) {
        this.#meals.push(meal);
        this.#totalCalories += meal.calories;
        Storage.updateTotalCalories(this.#totalCalories);
        Storage.saveMeal(meal);
        this.#displayNewItem(meal, 'meal');
        this.#render()
    }

    addWorkout(workout) {
        this.#workouts.push(workout);
        this.#totalCalories -= workout.calories;
        Storage.updateTotalCalories(this.#totalCalories);
        Storage.saveWorkout(workout);
        this.#displayNewItem(workout, 'workout');
        this.#render()
    }

    removeItem(id, type) {
        const items = type ==='meal' ? this.#meals : this.#workouts;
        const index = items.findIndex((item) => item.id === id);

        if (index !== -1) {
            this.#totalCalories += items[index].calories;
            Storage.updateTotalCalories(this.#totalCalories);
            items.splice(index, 1);
            Storage.remove(id, `${type}s`)
            this.#render();
        }
    }

    reset() {
        this.#totalCalories = 0;
        this.#meals = [];
        this.#workouts = [];
        Storage.clearAll()
        this.#render()
    }

    setLimit(calorieLimit) {
        this.#calorieLimit = calorieLimit;
        Storage.setCalorieLimit(calorieLimit);
        this.#displayCaloriesLimit();
        this.#render();
    }

    loadItems() {
        this.#meals.forEach(meal => this.#displayNewItem(meal, 'meal'));
        this.#workouts.forEach(workout => this.#displayNewItem(workout, 'workout'));
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

export default CalorieTracker;