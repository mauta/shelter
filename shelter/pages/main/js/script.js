const burgerBtn = document.querySelector('.header__burger')
const burgerMenu = document.querySelector('.burger')
const burgerLogo = document.querySelector('.burger__logo')
const headerLogo = document.querySelector('.header__logo')


burgerBtn.addEventListener('click', () => {
  // burgerBtn.classList.toggle('header__burger--close')

  if ( burgerBtn.classList.contains("header__burger--close")) {
    burgerBtn.classList.remove("header__burger--close");
    burgerBtn.classList.add("header__burger--open");

  } else {
    burgerBtn.classList.remove("header__burger--open");
    burgerBtn.classList.add("header__burger--close");
    
  }

  burgerMenu.classList.toggle('burger__animation')
  burgerMenu.classList.toggle('burger__animation--close')
  burgerLogo.classList.toggle('burger__logo--open')
  headerLogo.classList.toggle('header__logo--hide')
})