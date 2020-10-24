const burgerBtn = document.querySelector('.header__burger')
const burgerMenu = document.querySelector('.burger')
const burgerLogo = document.querySelector('.burger__logo')
const headerLogo = document.querySelector('.header__logo')
const darkScreen = document.querySelector('.dark-screen')
const burgerLinks = document.querySelectorAll('.burger__link')
let isBurgerOpen = false
let isAnimathionStop = true
let vh = window.innerHeight * 0.01;

document.documentElement.style.setProperty('--vh', `${vh}px`);

const openBurger = () => {
  if (isAnimathionStop === true) {
    isAnimathionStop = false
    darkScreen.style.display = 'block'
    burgerBtn.classList.remove('header__burger--close')
    burgerBtn.classList.add('header__burger--open')
    burgerMenu.classList.add('burger--active')
    burgerMenu.classList.add('burger__animation-in')
    burgerMenu.classList.remove('burger__animation-out')
    burgerLogo.classList.add('burger__logo--open')
    headerLogo.classList.add('header__logo--hide')
    document.body.style.overflowY = 'hidden'
    burgerLogo.addEventListener('animationend', () => {
      isAnimathionStop = true
      isBurgerOpen = true
    })
  }

}

const closeBurger = () => {
    darkScreen.style.display = 'none'
    burgerBtn.classList.remove("header__burger--open")
    burgerBtn.classList.add("header__burger--close")
    burgerMenu.classList.remove('burger__animation-in')
    burgerMenu.classList.add('burger__animation-out')
    burgerLogo.classList.remove('burger__logo--open')
    headerLogo.classList.remove('header__logo--hide')
    document.body.style.overflowY = 'visible'
    setTimeout(removeClassActive, 1500)
    isBurgerOpen = false 
}

const removeClassActive = () => {
  burgerMenu.classList.remove('burger--active')
}

burgerBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (isBurgerOpen) {
    closeBurger()    
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
    }
  }
})

burgerLinks.forEach(item => {
  item.addEventListener('click', (evt) => {
    evt.preventDefault
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


fetch('./js/pets.json').then(res => res.json()).then(json => {
  const petCardTemplate = document.querySelector('#petCard').content
  let pageSize
  let isEnable = true

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
      console.log('znnfdg')
      popup.querySelector('.popup__img').setAttribute('src', pet.img)
      popup.querySelector('.popup__name').textContent = pet.name
      popup.querySelector('.popup__type-breed').textContent = `${pet.type} - ${pet.breed}`
      popup.querySelector('.popup__text').textContent = pet.description
      popup.querySelector('.popup__age').textContent = pet.age
      popup.querySelector('.popup__inoculations').textContent = pet.inoculations
      popup.querySelector('.popup__diseases').textContent = pet.diseases
      popup.querySelector('.popup__parasites').textContent = pet.parasites
      document.body.style.overflowY = 'hidden'
    }

    const popupClose = (evt) => {
      evt.preventDefault()
      darkScreen.style.display = 'none'
      popup.classList.remove('popup--active')
      document.body.style.overflowY = 'visible'
    }

    window.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        popupClose(evt)
      }
    })

    popupCloseBtn.addEventListener('click', popupClose)

    document.querySelector('.dark-screen').addEventListener('click', popupClose)


    popup.addEventListener('mouseleave',()=>{
      console.log('ушел на базу')
      popupCloseBtn.style.backgroundColor ='#FDDCC4'
    })

    popup.addEventListener('mouseenter',(e)=>{
      console.log(e.target)
      popupCloseBtn.style.backgroundColor =null

    })
  })


  let arrpets = []

  const generatePets = () => {
    while (arrpets.length < 3) {
      let randomPet = Math.floor(Math.random() * Math.floor(json.length))
      if (!arrpets.includes(randomPet)) {
        arrpets.push(randomPet)
      }
    }
  }

  const generateAnotherPets = () => {
    const oldarrpets = arrpets
    arrpets = []
    while (arrpets.length < 3) {
      let randomPet = Math.floor(Math.random() * Math.floor(json.length))
      if (!arrpets.includes(randomPet) && !oldarrpets.includes(randomPet)) {
        arrpets.push(randomPet)
      }
    }
    console.log('arrpets ' + arrpets)
  }

  generatePets()

  const petListAdd = (direction) => {
    let sliderList = document.createElement('ul')
    sliderList.classList.add('slider__list')
    if (direction === 'next') {
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

  const draw = (direction) => {
    const sliderItems = document.querySelectorAll('.slider__item')
    if (direction === 'previous') {
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
    } else {
      if (pageSize === 'decktop') {
      }
      if (pageSize === 'tablet') {
        let a = sliderItems[5]
        a.style.display = 'none'
      }
      if (pageSize === 'mobile') {
        let a = sliderItems[5]
        let b = sliderItems[4]
        a.style.display = 'none'
        b.style.display = 'none'
      }
    }

  }
  draw('previous')



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

  const dellist = (direction) => {
    const sliderlists = document.querySelectorAll('.slider__list')
    if (direction === 'next') {
      sliderlists[0].remove()
    }
    if (direction === 'previous') {
      sliderlists[1].remove()
    }
  }

  sliderBtnPrevious.addEventListener('click', function () {
    if (isEnable === true) {
      isEnable = false
      const direction = 'previous'

      generateAnotherPets()
      petListAdd(direction)
      draw(direction)
      const sliderlists = document.querySelectorAll('.slider__list')
      sliderlists[1].style.left = '-100%'
      sliderlists[0].style.zIndex = '2'
      sliderlists[0].classList.add('from-left')
      sliderlists[0].addEventListener('animationend', () => {
        dellist(direction)
        document.querySelector('.slider__list').classList.remove('from-left')
        sliderlists[0].style.zIndex = '0'
        isEnable = true
      })
    }


  })

  sliderBtnNext.addEventListener('click', function () {
    if (isEnable === true) {
      isEnable = false
      const direction = 'next'
      generateAnotherPets()
      petListAdd(direction)
      draw(direction)
      const sliderlists = document.querySelectorAll('.slider__list')
      sliderlists[1].classList.add('from-right')
      sliderlists[1].addEventListener('animationend', () => {
        dellist(direction)
        document.querySelector('.slider__list').classList.remove('from-right')
        isEnable = true
      })
    }
  })





})