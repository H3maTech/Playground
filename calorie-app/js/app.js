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
        this.#render()
    }

    addWorkout(workout) {
        this.#workouts.push(workout);
        this.#totalCalories -= workout.calories;
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
        document.querySelector('#meal-form').addEventListener('submit', this.#newMeal.bind(this))
        document.querySelector('#workout-form').addEventListener('submit', this.#newWorkout.bind(this))
    }

    #newMeal(e) {
        e.preventDefault();

        const name = document.querySelector('#meal-name')
        const calories = document.querySelector('#meal-calories')
        // TODO: Validate inputs
        if (name.value === '' || calories.value === '' || name.value === ' ') {
            alert('Please fill in all fields');
            return;
        }

        this.tracker.addMeal(new Meal(name.value, +calories.value));
        name.value = '';
        calories.value = '';
        const collapseMeal = document.querySelector('#collapse-meal');
        const bsCollapse = new bootstrap.Collapse(collapseMeal, {
            toggle: true
        });
    }

    #newWorkout(e) {
        e.preventDefault();

        const name = document.querySelector('#workout-name')
        const calories = document.querySelector('#workout-calories')
        // TODO: Validate inputs
        if (name.value === '' || calories.value === '' || name.value === ' ') {
            alert('Please fill in all fields');
            return;
        }

        this.tracker.addWorkout(new Workout(name.value, +calories.value));
        name.value = '';
        calories.value = '';
        const collapseWorkout = document.querySelector('#collapse-workout');
        const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
            toggle: true
        });
    }
}

const app = new App()