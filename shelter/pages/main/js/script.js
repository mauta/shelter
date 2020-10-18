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

window.addEventListener('resize', () => {
  if (isBurgerOpen) {
    closeBurger()
  }
})


// ******************** pop_up **************************



// ******************** draw slider item ********************

const sliderList = document.querySelector('.slider__list')

fetch('./js/pets.json').then(res => res.json()).then(json => {
  const petCardTemplate = document.querySelector('#petCard').content


  petListInit = (count) => {

    for (let i = 0; i < count; i++) {
      const randomPet = Math.floor(Math.random() * Math.floor(json.length));

      sliderList.append(petCardTemplate.cloneNode(true))
      const sliderItem = sliderList.querySelectorAll('.slider__item')
      const sliderImg = sliderList.querySelectorAll('.slider__img')
      const sliderName = sliderList.querySelectorAll('.slider__name')
      sliderItem[i].setAttribute('id', `${json[randomPet].id}`)
      sliderName[i].textContent = `${json[randomPet].name}`
      sliderImg[i].setAttribute('src', `${json[randomPet].img}`)
    }
  }

  petListInit(3)

  const sliderItems = sliderList.querySelectorAll('.slider__item')


  const popupTemplate = document.querySelector('#popup').content
  let popupTemplateClone = popupTemplate.cloneNode(true)
  const petsSection = document.querySelector('.pets')
  let popupCloseBtn = popupTemplateClone.querySelector('.popup__close-btn')


  const supportsTemplate = () => {
    return 'content' in document.createElement('template')
  }

  sliderList.addEventListener('click', (evt) => {
    evt.preventDefault()

    if (evt.target.classList.contains('slider__btn')) {
      if (supportsTemplate()) {
        darkScreen.style.display = 'block'
        const petId = evt.target.parentNode.getAttribute('id')
        const pet = json.find(el => el.id === petId)
        petsSection.append(popupTemplateClone)
        petsSection.querySelector('.popup__img').setAttribute('src', pet.img)
        petsSection.querySelector('.popup__name').textContent = pet.name
        petsSection.querySelector('.popup__type-breed').textContent = `${pet.type} - ${pet.breed}`
        petsSection.querySelector('.popup__text').textContent = pet.description
        petsSection.querySelector('.popup__age').textContent = pet.age
        petsSection.querySelector('.popup__inoculations').textContent = pet.inoculations
        petsSection.querySelector('.popup__diseases').textContent = pet.diseases
        petsSection.querySelector('.popup__parasites').textContent = pet.parasites
      }

      popupCloseBtn.addEventListener('click', (evt) => {
        evt.preventDefault()
        darkScreen.style.display = 'none'
        const popup = document.querySelector('.popup')
        petsSection.removeChild(popup)
        popupTemplateClone = popupTemplate.cloneNode(true)
        popupCloseBtn = popupTemplateClone.querySelector('.popup__close-btn')
      })
    }

  })

  petListAddFirst = () => {

    const randomPet = Math.floor(Math.random() * Math.floor(json.length))
    sliderList.prepend(petCardTemplate.cloneNode(true))
    const sliderItem = sliderList.querySelectorAll('.slider__item')
    const sliderImg = sliderList.querySelectorAll('.slider__img')
    const sliderName = sliderList.querySelectorAll('.slider__name')
    sliderItem[0].setAttribute('id', `${json[randomPet].id}`)
    sliderName[0].textContent = `${json[randomPet].name}`
    sliderImg[0].setAttribute('src', `${json[randomPet].img}`)

  }

  petListAddLast = () => {

    const randomPet = Math.floor(Math.random() * Math.floor(json.length))
    sliderList.append(petCardTemplate.cloneNode(true))
    const sliderItem = sliderList.querySelectorAll('.slider__item')
    const sliderImg = sliderList.querySelectorAll('.slider__img')
    const sliderName = sliderList.querySelectorAll('.slider__name')
    
    sliderItem[sliderItem.length-1].setAttribute('id', `${json[randomPet].id}`)
    sliderName[sliderItem.length-1].textContent = `${json[randomPet].name}`
    sliderImg[sliderItem.length-1].setAttribute('src', `${json[randomPet].img}`)

  }

  const sliderBtnPrevious = document.querySelector('.pets__slide-btn--previous')
  const sliderBtnNext = document.querySelector('.pets__slide-btn--next')

  sliderBtnPrevious.addEventListener('click', petListAddFirst)
  sliderBtnNext.addEventListener('click', petListAddLast)

})