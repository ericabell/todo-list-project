// grab all the mark completed buttons

let markCompletedButton = document.querySelectorAll('.mark-complete-button');

markCompletedButton.forEach( (button) => {
  button.addEventListener('click', (e) => {
    console.log(e);
  })
});
