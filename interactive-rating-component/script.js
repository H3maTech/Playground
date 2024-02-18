const card = document.querySelector('.card')
const ratings = document.querySelectorAll('.list li');
const btn = document.querySelector('.btn');
let rateValue;

function handleRateClick(e) {
    console.log('You clicked on a circle');
    const targetRate = e.currentTarget.firstElementChild;
    rateValue = targetRate.getAttribute('value')
    console.log(rateValue);
    ratings.forEach(item => {
        item.firstElementChild !== targetRate
        ? item.firstElementChild.classList.remove('clicked')
        : targetRate.classList.add('clicked');
    })
}

function handleButtonClick(e) {
    const html = `
        <img src="images/illustration-thank-you.svg" alt="" />
        <span class="badge">
            <p class="badge__text">You selected ${rateValue} out of 5</p>
        </span>
        <h1 class="card__heading">Thank you!</h1>
        <p class="card__desc">
            We appreciate you taking the time to give a rating. if you ever need more
            support, don't hesitate to get in touch!
        </p>
    `;

    card.classList.add('card--thanks')
    card.innerHTML = html;
}

ratings.forEach(item => {
    item.addEventListener('click', handleRateClick)
})
btn.addEventListener('click', handleButtonClick)