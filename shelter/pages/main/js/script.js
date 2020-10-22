const burgerBtn = document.querySelector('.header__burger')
const burgerMenu = document.querySelector('.burger')
const burgerLogo = document.querySelector('.burger__logo')
const headerLogo = document.querySelector('.header__logo')
const darkScreen = document.querySelector('.dark-screen')
const burgerLinks = document.querySelectorAll('.burger__link')
let isBurgerOpen = false;

const openBurger = () => {
  darkScreen.style.display = 'block'
  burgerBtn.classList.remove('header__burger--close')
  burgerBtn.classList.add('header__burger--open')
  burgerMenu.classList.add('burger--active')
  burgerMenu.classList.add('burger__animation-in')
  burgerMenu.classList.remove('burger__animation-out')
  burgerLogo.classList.add('burger__logo--open')
  headerLogo.classList.add('header__logo--hide')
  isBurgerOpen = true
}

const closeBurger = () => {

  darkScreen.style.display = 'none'
  burgerBtn.classList.remove("header__burger--open")
  burgerBtn.classList.add("header__burger--close")

  burgerMenu.classList.remove('burger__animation-in')
  burgerMenu.classList.add('burger__animation-out')
  burgerLogo.classList.remove('burger__logo--open')
  headerLogo.classList.remove('header__logo--hide')
  const animation = document.querySelector('.burger__animation-out')
  isBurgerOpen = false
}

const removeClassActive = () => {
  burgerMenu.classList.remove('burger--active')
}

burgerBtn.addEventListener('click', (e) => {
  e.stopPropagation();

  if (isBurgerOpen) {
    closeBurger()
    setTimeout(removeClassActive, 2000)
  } else {
    openBurger()
  }
})

document.querySelector('.dark-screen').addEventListener('click', closeBurger)

window.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault
    if (isBurgerOpen) {
      closeBurger()
      setTimeout(removeClassActive, 2000)
    }
  }
})

burgerLinks.forEach(item => {
  item.addEventListener('click', (evt) => {
    if (isBurgerOpen) {
      closeBurger()
      setTimeout(removeClassActive, 2000)
    }
  })
})

window.addEventListener('resize', () => {
  if (isBurgerOpen) {
    closeBurger()
    setTimeout(removeClassActive, 2000)
  }
})





fetch('./js/pets.json').then(res => res.json()).then(json => {
  const petCardTemplate = document.querySelector('#petCard').content
  let pageSize

  initPageSize = () => {
    if (window.innerWidth < 768) {
      pageSize = 'mobile'
    } else if (window.innerWidth < 1100) {
      pageSize = 'tablet'
    } else {
      pageSize = 'decktop'
    }
  }

  initPageSize()


  const popup = document.querySelector('.popup')
  const popupCloseBtn = popup.querySelector('.popup__close-btn')
  const petsSection = document.querySelector('.pets')
  const petsSlider = document.querySelector('.pets__slider')
  const sliderList = document.querySelector('.slider__list')

  petsSlider.addEventListener('click', (evt) => {
    evt.preventDefault()

    if (evt.target.parentNode.classList.contains('slider__item')) {
      darkScreen.style.display = 'block'
      const petId = evt.target.parentNode.getAttribute('id')
      const pet = json.find(el => el.id === petId)
      popup.classList.add('popup--active')
      popup.querySelector('.popup__img').setAttribute('src', pet.img)
      popup.querySelector('.popup__name').textContent = pet.name
      popup.querySelector('.popup__type-breed').textContent = `${pet.type} - ${pet.breed}`
      popup.querySelector('.popup__text').textContent = pet.description
      popup.querySelector('.popup__age').textContent = pet.age
      popup.querySelector('.popup__inoculations').textContent = pet.inoculations
      popup.querySelector('.popup__diseases').textContent = pet.diseases
      popup.querySelector('.popup__parasites').textContent = pet.parasites
    }

    popupClose = (evt) => {
      evt.preventDefault()
      darkScreen.style.display = 'none'
      popup.classList.remove('popup--active')
    }

    window.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        popupClose(evt)
      }
    })

    popupCloseBtn.addEventListener('click', popupClose)

    document.querySelector('.dark-screen').addEventListener('click', popupClose)
  })


  let arrpets = []

  generatePets = () => {
    while (arrpets.length < 3) {
      let randomPet = Math.floor(Math.random() * Math.floor(json.length))
      if (!arrpets.includes(randomPet)) {
        arrpets.push(randomPet)
      }
    }
    console.log('arrpets ' + arrpets)
  }

  generatePets()

  petListAdd = (direction) => {
    let sliderList = document.createElement('ul')
    sliderList.classList.add('slider__list')
    if(direction ==='next'){
      petsSlider.append(sliderList)
    } else {
      petsSlider.prepend(sliderList)
    }
    
    for (let i = 0; i < 3; i++) {
      const itemNumber = arrpets[i]
      sliderList.append(petCardTemplate.cloneNode(true))
      const sliderItem = sliderList.querySelectorAll('.slider__item')
      const sliderImg = sliderList.querySelectorAll('.slider__img')
      const sliderName = sliderList.querySelectorAll('.slider__name')
      sliderItem[sliderItem.length - 1].setAttribute('id', `${json[itemNumber].id}`)
      sliderName[sliderItem.length - 1].textContent = `${json[itemNumber].name}`
      sliderImg[sliderItem.length - 1].setAttribute('src', `${json[itemNumber].img}`)
    }

  }

  petListAdd('next')

  draw = () => {
    const sliderItems = document.querySelectorAll('.slider__item')
    if (pageSize === 'decktop') {

    }
    if (pageSize === 'tablet') {
      let a = sliderItems[2]
      a.style.display = 'none'
    }
    if (pageSize === 'mobile') {
      let a = sliderItems[2]
      let b = sliderItems[1]
      a.style.display = 'none'
      b.style.display = 'none'
    }
  }
  draw()



  window.addEventListener('resize', () => {
    let oldPageSize = pageSize
    initPageSize()

    if (oldPageSize !== pageSize) {
      const sliderItems = document.querySelectorAll('.slider__item')
      let a = sliderItems[1]
      let b = sliderItems[2]

      if (pageSize === 'tablet' && oldPageSize === 'decktop') {
        b.style.display = 'none'
      }

      if (pageSize === 'tablet' && oldPageSize === 'mobile') {
        a.style.display = 'block'
      }

      if (pageSize === 'mobile') {
        a.style.display = 'none'
        b.style.display = 'none'
      }

      if (pageSize === 'decktop') {
        a.style.display = 'block'
        b.style.display = 'block'
      }
    }
  })

  const sliderBtnPrevious = document.querySelector('.pets__slide-btn--previous')
  const sliderBtnNext = document.querySelector('.pets__slide-btn--next')



  sliderBtnPrevious.addEventListener('click', function () {
    const direction = 'previous'
    arrpets = []
    generatePets()
    petListAdd(direction)
    dellist(direction)
  })

  sliderBtnNext.addEventListener('click', function () {
    const direction = 'next'
    arrpets = []
    generatePets()
    petListAdd(direction)
    const sliderlists = document.querySelectorAll('.slider__list')
    console.log(sliderlists)
    sliderlists[0].style.backgroundColor = 'red'
    sliderlists[1].style.backgroundColor = 'green'
    sliderlists[0].classList.add('to-left')
    sliderlists[1].classList.add('from-right')
    
    // setTimeout(dellist(direction),3500)
    // // let animated = document.querySelector('.from-right')
    // // animated.addEventListener('animationend', ()=>{
    // //   console.log('Animation ended');
    // //   dellist(direction)
    //  document.querySelector('.slider__list').classList.remove('from-right')
    // // })
    
 })


  dellist = (direction) => {
    const sliderlists = document.querySelectorAll('.slider__list')
    if (direction === 'next') {
      sliderlists[0].remove()
    }
    if (direction === 'previous') {
      sliderlists[1].remove()
    }
  }


})