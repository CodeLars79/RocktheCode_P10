import './Arrow.css'

export const Arrow = () => {
  const arrow = document.createElement('img')
  arrow.src = 'assets/arrow.svg'
  arrow.alt = 'Scroll down'
  arrow.classList.add('arrow-icon')

  arrow.addEventListener('click', () => {
    let targetSection = document.querySelector('#eventscontainer')

    if (!targetSection) {
      targetSection = document.querySelector('.main-container')
    }

    if (!targetSection) {
      targetSection = document.querySelector('.hero-container')
    }

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  })

  return arrow
}

export default Arrow
