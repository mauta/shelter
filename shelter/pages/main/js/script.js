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



const sliderList = document.querySelector('.slider__list')

fetch('./js/pets.json').then(res => res.json()).then(json => {
  const petCardTemplate = document.querySelector('#petCard').content
  let pageSize 

  initPageSize = () => {
    if (window.innerWidth < 768) {
      pageSize = 'mobile'
    } else if (window.innerWidth < 1024) {
      pageSize = 'tablet'
    } else {
      pageSize = 'decktop'
    }
  }

  initPageSize()

  const arrpets = []

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

      popupClose = (evt) => {
        evt.preventDefault()
        darkScreen.style.display = 'none'
        const popup = document.querySelector('.popup')
        petsSection.removeChild(popup)
        popupTemplateClone = popupTemplate.cloneNode(true)
        popupCloseBtn = popupTemplateClone.querySelector('.popup__close-btn')
      }

      popupCloseBtn.addEventListener('click', popupClose)


      window.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
          popupClose(evt)
        }
      })

      document.querySelector('.dark-screen').addEventListener('click',popupClose)

    }

  })

  petListAddFirst = () => {

    const randomPet = Math.floor(Math.random() * Math.floor(json.length))

    if (!arrpets.includes(randomPet)) {
      sliderList.prepend(petCardTemplate.cloneNode(true))
      const sliderItem = sliderList.querySelectorAll('.slider__item')
      const sliderImg = sliderList.querySelectorAll('.slider__img')
      const sliderName = sliderList.querySelectorAll('.slider__name')
      sliderItem[0].setAttribute('id', `${json[randomPet].id}`)
      sliderName[0].textContent = `${json[randomPet].name}`
      sliderImg[0].setAttribute('src', `${json[randomPet].img}`)
      arrpets.push(randomPet)
    } else petListAddFirst()
  }

  petListAddLast = () => {
    const randomPet = Math.floor(Math.random() * Math.floor(json.length))
    if (!arrpets.includes(randomPet)) {
      sliderList.append(petCardTemplate.cloneNode(true))
      const sliderItem = sliderList.querySelectorAll('.slider__item')
      const sliderImg = sliderList.querySelectorAll('.slider__img')
      const sliderName = sliderList.querySelectorAll('.slider__name')

      sliderItem[sliderItem.length - 1].setAttribute('id', `${json[randomPet].id}`)
      sliderName[sliderItem.length - 1].textContent = `${json[randomPet].name}`
      sliderImg[sliderItem.length - 1].setAttribute('src', `${json[randomPet].img}`)
      arrpets.push(randomPet)
    } else petListAddLast()


  }

  initSlider = (pageSize) => {
    if(pageSize === 'mobile'){
      petListAddFirst()
    }
    if (pageSize === 'tablet') {
      petListAddFirst()
      petListAddFirst()
    } 
    if (pageSize === 'decktop'){
      petListAddFirst()
      petListAddFirst()
    }     
  }

  initSlider(pageSize)

  const sliderBtnPrevious = document.querySelector('.pets__slide-btn--previous')
  const sliderBtnNext = document.querySelector('.pets__slide-btn--next')
  let sliderItems = sliderList.querySelectorAll('.slider__item')
  let currentItem = 0
  // let isEnabled = true


  // function hideItem(direction){
  //   isEnabled=false
  //   sliderItems[currentItem].classList.add(direction)
  //   sliderItems[currentItem].addEventListener('animationend',function(){
  //     this.classList.remote('active',direction)
  //   })
  // }

  // function showItem(direction){
  //   isEnabled=false
  //   sliderItems[currentItem].classList.add('next',direction)
  //   sliderItems[currentItem].addEventListener('animationend',function(){
  //     this.classList.remote('next',direction)
  //     this.classList.add('active')
  //     isEnabled = true
  //   })
  // }

  // function nextItem(n){
  //   hideItem('to-left')
  //   currentItem = n +1
  //   showItem('from-right')
  // }

  // function previous(n){
  //   hideItem('to-right')
  //   currentItem = n +1
  //   showItem('from-left')
  // }


  sliderBtnPrevious.addEventListener('click', function () {
    sliderItems = sliderList.querySelectorAll('.slider__item')
    if (currentItem > 0) {
      currentItem--
      sliderItems[currentItem].classList.remove('slider__item--hide')
      sliderItems[currentItem+3].classList.add('slider__item--hide')
    } else {
      
      petListAddFirst()
      sliderItems[currentItem+2].classList.add('slider__item--hide')
    }
  })
  sliderBtnNext.addEventListener('click', function () {
    sliderItems = sliderList.querySelectorAll('.slider__item')
    if (currentItem < sliderItems.length - 4) {
      sliderItems[currentItem].classList.add('slider__item--hide')
      sliderItems[currentItem+3].classList.remove('slider__item--hide')
      currentItem++
    } else {
      sliderItems[currentItem].classList.add('slider__item--hide')
      petListAddLast()
      currentItem++
    }
  })

})

  // window.addEventListener('resize', () => {
  //   let oldPageSize = pageSize
  //   initPageSize()
  //   if (oldPageSize !== pageSize) {
     
  //   }
  // })