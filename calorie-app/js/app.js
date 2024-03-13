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





    #render() {
        this.#displayCaloriesTotal();
        this.#displayCaloriesConsumed();
        this.#displayCaloriesBurned();
        this.#displayCaloriesRemaining()
        this.#displayCaloriesProgress();
    }
}



