// SET INITIAL COUNT
let count = 0;

// select value and button
const value = document.querySelector('#value');
const btns = document.querySelectorAll('.btn');
// const btns = document.getElementsByClassName('btn');

btns.forEach(function (btn) {
    btn.addEventListener('click', function(e) {
        const styles = e.currentTarget.classList;
        
        // change counter based on class of button clicked.
        if (styles.contains('decrease')) {
            count--;
        } else if (styles.contains('increase')) {
            count++;
        } else if (styles.contains('reset')) {
            count = 0;
        }

        // color text according to value
        if (count === 0) {
            value.style.color = '#222';
        } else if (count > 0) {
            value.style.color = 'green';
        } else {
            value.style.color = 'red';
        }

        value.textContent = count;
    })
})