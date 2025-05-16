const apply = document.getElementById('apply');
const warning = document.getElementById('warning');
const use = document.getElementById('use');
const price = document.getElementById('price');
apply.addEventListener('click', function () {
    const mileage = parseInt(use.value);
    if (mileage > 1800) {
        warning.hidden = false;
        use.value = "";
        price.textContent = (6000).toLocaleString();
    } else {
        warning.hidden = true;
        price.textContent = (6000 - mileage).toLocaleString();
    }
})