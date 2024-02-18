const ratings = document.querySelectorAll('.list li');

function handleClick(e) {
    console.log('You clicked on a circle');
    const targetRate = e.currentTarget.firstElementChild;
    ratings.forEach(item => {
        item.firstElementChild !== targetRate
        ? item.firstElementChild.classList.remove('clicked')
        : targetRate.classList.add('clicked');
    })
}

ratings.forEach(item => {
    item.addEventListener('click', handleClick)
})