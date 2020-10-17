const burgerBtn = document.querySelector('.header__burger')
const burgerMenu = document.querySelector('.burger')
const burgerLogo = document.querySelector('.burger__logo')
const headerLogo = document.querySelector('.header__logo')
const darkScreen = document.querySelector('.dark-screen')
const burgerLinks = document.querySelectorAll('.burger__link')
let isBurgerOpen = false;

const openBurger = () => {
  darkScreen.style.display = 'block'
  burgerBtn.classList.remove("header__burger--close");
  burgerBtn.classList.add("header__burger--open");
  burgerMenu.classList.toggle('burger__animation')
  burgerLogo.classList.toggle('burger__logo--open')
  headerLogo.classList.toggle('header__logo--hide') 
  isBurgerOpen = true
}

const closeBurger = () => {
  darkScreen.style.display = 'none'
  burgerBtn.classList.remove("header__burger--open");
  burgerBtn.classList.add("header__burger--close");
  burgerMenu.classList.toggle('burger__animation')
  burgerLogo.classList.toggle('burger__logo--open')
  headerLogo.classList.toggle('header__logo--hide')
  isBurgerOpen = false
}

burgerBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  isBurgerOpen ? closeBurger() : openBurger()

})



document.addEventListener('click', (e) => {
  let target = e.target;

  if (burgerMenu.contains(target) && !target.classList.contains('header__burger')) {
   
  } else {
    if (isBurgerOpen) {
      closeBurger()
    }

  }
})

window.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault
    if (isBurgerOpen) {
      closeBurger()
    }
  }
})

burgerLinks.forEach(item => {
  item.addEventListener('click', (evt) => {
      if (isBurgerOpen) {
        closeBurger()
      }
    })
  })

window.addEventListener('resize',()=>{
  if (isBurgerOpen) {
    closeBurger()
  }
})


// ************************************ pop_up ****************************************************************************

const popupTemplate = document.querySelector('#popup').content
let popupTemplateClone = popupTemplate.cloneNode(true) 
// const learnBtn = document.querySelectorAll('.slider__btn')
const sliderList = document.querySelector('.slider__list')
const petsSection = document.querySelector('.pets')
let popupCloseBtn = popupTemplateClone.querySelector('.popup__close-btn')


const supportsTemplate=()=>{
  return 'content' in document.createElement('template')
}

sliderList.addEventListener('click',(evt)=>{
  evt.preventDefault()

  if(evt.target.classList.contains('slider__btn')){
    if(supportsTemplate()){
      darkScreen.style.display = 'block'
      petsSection.appendChild(popupTemplateClone)
    }
  
    popupCloseBtn.addEventListener('click',(evt)=>{
      evt.preventDefault()
      darkScreen.style.display = 'none'
      const popup = document.querySelector('.popup')
      petsSection.removeChild(popup)
      popupTemplateClone = popupTemplate.cloneNode(true)
      popupCloseBtn = popupTemplateClone.querySelector('.popup__close-btn')    
    })
  }
 
})

