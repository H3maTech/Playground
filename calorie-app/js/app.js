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



    #render() {
        this.#displayCaloriesTotal();
        this.#displayCaloriesConsumed();
        this.#displayCaloriesBurned();
        this.#displayCaloriesRemaining()
        this.#displayCaloriesProgress();
    }
}



