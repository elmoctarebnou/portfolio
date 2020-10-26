'use strict';
const dropDownMenu = () => {
  $(".nav-bar").on("click", '#hamburger-menu', (event) => {
    event.preventDefault();
    const top = $('#top').toggleClass('rotateDown');
    const middle = $('#middle').toggleClass('hide');
    const bottom = $('#bottom').toggleClass('rotateUp');
    const dropDownNav = $('#drop-nav-div').toggleClass('hide');
  });
  $("#drop-nav").on('click', 'li', (event) => { 
    const current = event.currentTarget; 
    const top = $('#top').toggleClass('rotateDown');
    const middle = $('#middle').toggleClass('hide');
    const bottom = $('#bottom').toggleClass('rotateUp');
    const dropDownNav = $("#drop-nav-div").toggleClass('hide');
  });
};

$(dropDownMenu);