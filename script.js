'use strict';
const dropDownMenu = () => {
  $(".nav-bar").on("click", '#hamburger-menu', (event) => {
    event.preventDefault();
    const top = $('#top').toggleClass('rotateDown');
    const middle = $('#middle').toggleClass('hide');
    const bottom = $('#bottom').toggleClass('rotateUp');
    const dropDownNav = $('.drop-nav').toggleClass('active');
  });
  $(".drop-nav").on('click', 'li', (event) => { 
    const current = event.currentTarget; 
    const top = $('#top').toggleClass('rotateDown');
    const middle = $('#middle').toggleClass('hide');
    const bottom = $('#bottom').toggleClass('rotateUp');
    const dropDownNav = $(".drop-nav").toggleClass('active');
  });
};
const text = `Hi, I\'m EL Moctar Ebnou.`;
let count = 0;
let letter = '';
let innerText = '';

(function type () {
  const inter = setTimeout(type, 50);
  if(count === text.length){
    count = 0;
    clearTimeout(inter);
  }
  letter = text[count];
  document.getElementById('txt-type').innerText = innerText;
  innerText += letter;
  count++;
  
})();


$(dropDownMenu);
