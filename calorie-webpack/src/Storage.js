class Storage {
    static getCalorieLimit(defaultLimit = 2000) {
        return localStorage.getItem('calorieLimit') === null
        ? defaultLimit
        : +localStorage.getItem('calorieLimit');
    }

    static setCalorieLimit(calorieLimit) {
        localStorage.setItem('calorieLimit', calorieLimit);
    }

    static getTotalCalories(defaultCalories = 0) {
        return localStorage.getItem('totalCalories') === null
        ? defaultCalories
        : +localStorage.getItem('totalCalories');
    }

    static updateTotalCalories(calories) {
        localStorage.setItem('totalCalories', calories);
    }

    static getItems(type) {
        return localStorage.getItem(type) === null
        ? []
        : JSON.parse(localStorage.getItem(type));
    }

    static remove(id, type) {
        const items = Storage.getItems(type);
        items.forEach((item, index) => {
            if (item.id === id) {
                items.splice(index, 1);
            }
        })

        localStorage.setItem(type, JSON.stringify(items))
    }

    static saveMeal(meal) {
        const meals = Storage.getItems('meals');
        meals.push(meal);
        localStorage.setItem('meals', JSON.stringify(meals));
    }

    static saveWorkout(workout) {
        const workouts = Storage.getItems('workouts');
        workouts.push(workout);
        localStorage.setItem('workouts', JSON.stringify(workouts));
    }

    static clearAll() {
        localStorage.removeItem('totalCalories');
        localStorage.removeItem('meats');
        localStorage.removeItem('workouts');
        // localStorage.clear();
    }
}

export default Storage