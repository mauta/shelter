fetch('./js/pets.json').then(res => res.json()).then(json => {
  const petCardTemplate = document.querySelector('#petCard').content
  const freindsList = document.querySelector('.friends__list')
  const arrpets = []
  const PETS_COUNT = 48
  let pageSize
  let pageNumber = 1
  let lastPage

  initPageSize = () => {
    if (window.innerWidth < 786) {
      pageSize = 'mobile'
      console.log(window.innerWidth)
      console.log(pageSize)
    }
    if (window.innerWidth <1221  && window.innerWidth > 785) {
      pageSize = 'tablet'
      console.log(window.innerWidth)
      console.log(pageSize)
    }
    if (window.innerWidth > 1220) {
      pageSize = 'decktop'
      console.log(window.innerWidth)
      console.log(pageSize)
    }
  }

  initPageSize()

  getLastPageNumber = () => {
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

  generatePets = () => {
    while (arrpets.length < PETS_COUNT) {
      let randomPet = Math.floor(Math.random() * Math.floor(json.length))
      if (!arrpets.includes(randomPet)) {
        arrpets.push(randomPet)
      }
    }
  }

  generatePets()

  petAdd = (itemNumber) => {
    freindsList.append(petCardTemplate.cloneNode(true))
    const sliderItem = freindsList.querySelectorAll('.slider__item')
    const sliderImg = freindsList.querySelectorAll('.slider__img')
    const sliderName = freindsList.querySelectorAll('.slider__name')
    sliderItem[sliderItem.length - 1].setAttribute('id', `${json[itemNumber].id}`)
    sliderName[sliderItem.length - 1].textContent = `${json[itemNumber].name}`
    sliderImg[sliderItem.length - 1].setAttribute('src', `${json[itemNumber].img}`)
  }


  draw = (pageNumber) => {
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
  }

  draw(pageNumber)

  delPets = () => {
    while (freindsList.firstChild) {
      freindsList.removeChild(freindsList.firstChild);
    }
  }

  window.addEventListener('resize', () => {
    let oldPageSize = pageSize
    initPageSize()
    if (oldPageSize !== pageSize) {
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