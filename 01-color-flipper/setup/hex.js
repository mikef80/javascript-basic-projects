const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

// ASSIGN BUTTON AND SPAN TEXT TO VARIABLES
const btn = document.getElementById('btn');
const color = document.querySelector('.color');

// ADD EVENT LISTENER FOR BUTTON CLICK AND RUN FUNCTION
btn.addEventListener('click', function(){
    let hexColor = '#';
    for (let i = 0; i < 6; i ++) {
        hexColor += hex[randomNumber()];
    }
    
    color.textContent = hexColor;
    document.body.style.backgroundColor = hexColor;
})

// RANDOM NUMBER GENERATOR FOR HEX CODE
const randomNumber = () => {
    return Math.floor(Math.random() * hex.length);
}