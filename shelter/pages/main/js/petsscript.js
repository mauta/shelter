const burgerBtn = document.querySelector('.header__burger')
const burgerMenu = document.querySelector('.burger')
const burgerLogo = document.querySelector('.burger__logo')
const headerLogo = document.querySelector('.header__logo')
const darkScreen = document.querySelector('.dark-screen')
const burgerLinks = document.querySelectorAll('.burger__link')
let isBurgerOpen = false
let isAnimathionStop = true
let vh = window.innerHeight * 0.01

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
  setTimeout(removeClassActive, 2000)
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
      setTimeout(removeClassActive, 2000)
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
    setTimeout(removeClassActive, 2000)
  }
})


fetch('./js/pets.json').then(res => res.json()).then(json => {
  const petCardTemplate = document.querySelector('#petCard').content
  const freindsList = document.querySelector('.friends__list')  
  const arrpets = []
  const PETS_COUNT = 48
  let pageSize
  let pageNumber = 1
  let lastPage

  const initPageSize = () => {
    if (window.innerWidth < 768) {
      pageSize = 'mobile'
    }
    if (window.innerWidth < 1221 && window.innerWidth > 785) {
      pageSize = 'tablet'
    }
    if (window.innerWidth > 1220) {
      pageSize = 'decktop'
    }
  }

  initPageSize()

  const getLastPageNumber = () => {
    if (pageSize === 'decktop') {
      lastPage = PETS_COUNT / 8
    }
    if (pageSize === 'tablet') {
      lastPage = PETS_COUNT / 6
    }
    if (pageSize === 'mobile') {
      lastPage = PETS_COUNT / 3
    }
  }

  getLastPageNumber()

  const generatePets = () => {
    while (arrpets.length < PETS_COUNT) {
      let randomPet = Math.floor(Math.random() * Math.floor(json.length))
      if (!arrpets.includes(randomPet)) {
        arrpets.push(randomPet)
      }
    }
  }

  generatePets()

  const petAdd = (itemNumber) => {
    freindsList.append(petCardTemplate.cloneNode(true))
    const sliderItem = freindsList.querySelectorAll('.slider__item')
    const sliderImg = freindsList.querySelectorAll('.slider__img')
    const sliderName = freindsList.querySelectorAll('.slider__name')
    sliderItem[sliderItem.length - 1].setAttribute('id', `${json[itemNumber].id}`)
    sliderName[sliderItem.length - 1].textContent = `${json[itemNumber].name}`
    sliderImg[sliderItem.length - 1].setAttribute('src', `${json[itemNumber].img}`)
    
  }


  const draw = (pageNumber) => {
    if (pageNumber > lastPage) {
      pageNumber = lastPage
      pageSpan.textContent = pageNumber
    }
    if (pageSize === 'decktop') {
      for (let i = (pageNumber - 1) * 8; i < pageNumber * 8; i++) {
        petAdd(arrpets[i])
      }
    }
    if (pageSize === 'tablet') {
      for (let i = (pageNumber - 1) * 6; i < pageNumber * 6; i++) {
        petAdd(arrpets[i])
      }
    }
    if (pageSize === 'mobile') {
      for (let i = (pageNumber - 1) * 3; i < pageNumber * 3; i++) {
        petAdd(arrpets[i])
      }
    }
    const friendsList = document.querySelector('.friends__list')
    const popup = document.querySelector('.popup')
    const popupCloseBtn = popup.querySelector('.popup__close-btn')

    friendsList.addEventListener('click',(evt)=>{
      evt.preventDefault()
      if(evt.target.parentNode.classList.contains('slider__item')){
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
        document.querySelector('.header-pets').style.zIndex = '1'
        document.body.style.overflowY = 'hidden'
      }

      popupClose = (evt) => {
        evt.preventDefault()
        darkScreen.style.display = 'none'
        popup.classList.remove('popup--active')
        document.body.style.overflowY = 'visible'   
        document.querySelector('.header-pets').style.zIndex = '3'     
      }

      popupCloseBtn.addEventListener('click', popupClose)

      window.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
          popupClose(evt)
        }
      })

      document.querySelector('.dark-screen').addEventListener('click',popupClose)

    })

    popup.addEventListener('mouseleave',()=>{
      popupCloseBtn.style.backgroundColor ='#FDDCC4'
    })

    popup.addEventListener('mouseenter',(e)=>{
      popupCloseBtn.style.backgroundColor =null
    })
  }

  draw(pageNumber)

  const delPets = () => {
    while (freindsList.firstChild) {
      freindsList.removeChild(freindsList.firstChild);
    }
  }

  window.addEventListener('resize', () => {
    let oldPageSize = pageSize
    initPageSize()
    if (oldPageSize !== pageSize) {
      initPageSize()
      delPets()
      draw(pageNumber)
    }
  })

  const nextBtn = document.querySelector('.friends__slide-btn--next')
  const lastBtn = document.querySelector('.friends__slide-btn--last')
  const previousBtn = document.querySelector('.friends__slide-btn--previous')
  const firstBtn = document.querySelector('.friends__slide-btn--first')
  const pageSpan = document.querySelector('.pets__page')





  nextBtn.addEventListener('click', () => {
    pageNumber++
    pageSpan.textContent = pageNumber
    delPets()
    draw(pageNumber)
    if (pageNumber === lastPage) {
      lastBtn.setAttribute('disabled', 'disabled')
      nextBtn.setAttribute('disabled', 'disabled')
    }
    firstBtn.removeAttribute('disabled')
    previousBtn.removeAttribute('disabled')
  })

  previousBtn.addEventListener('click', () => {
    pageNumber--
    pageSpan.textContent = pageNumber
    delPets()
    draw(pageNumber)
    if (pageNumber === 1) {
      firstBtn.setAttribute('disabled', 'disabled')
      previousBtn.setAttribute('disabled', 'disabled')
    }
    lastBtn.removeAttribute('disabled')
    nextBtn.removeAttribute('disabled')

  })

  lastBtn.addEventListener('click', () => {
    pageNumber = lastPage
    pageSpan.textContent = lastPage
    delPets()
    draw(pageNumber)
    lastBtn.setAttribute('disabled', 'disabled')
    nextBtn.setAttribute('disabled', 'disabled')
    firstBtn.removeAttribute('disabled')
    previousBtn.removeAttribute('disabled')
  })

  firstBtn.addEventListener('click', () => {
    pageNumber = 1
    pageSpan.textContent = pageNumber
    delPets()
    draw(pageNumber)
    firstBtn.setAttribute('disabled', 'disabled')
    previousBtn.setAttribute('disabled', 'disabled')
    lastBtn.removeAttribute('disabled')
    nextBtn.removeAttribute('disabled')
  })

 

















  // самый-самый конец
})