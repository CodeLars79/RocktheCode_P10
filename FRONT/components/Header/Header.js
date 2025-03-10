import { navigate } from '../../utils/functions/navigate'
import { routes } from '../../utils/routes/routes'
import './Header.css'

const isLoggedIn = () => !!localStorage.getItem('token')

export const Header = () => {
  const header = document.createElement('header')
  header.innerHTML = `
    <nav>
      <button class="burger-button">☰</button>
      <ul class="nav-menu"></ul>
    </nav>
  `

  const burgerButton = header.querySelector('.burger-button')
  const navMenu = header.querySelector('.nav-menu')

  const renderLinks = () => {
    navMenu.innerHTML = ''

    const filteredRoutes = isLoggedIn()
      ? routes.filter(
          (route) => !['/register', '/login', '/profile'].includes(route.path)
        ) // Exclude profile
      : routes.filter(
          (route) =>
            !['/create-event', '/my-events', '/profile'].includes(route.path)
        )

    filteredRoutes.forEach((route, index) => {
      const li = document.createElement('li')
      li.innerHTML = `<a href="${route.path}" id="nav-link-${index}">${route.text}</a>`
      li.querySelector('a').addEventListener('click', (e) => {
        navigate(e, route)
        closeMenu()
      })
      navMenu.appendChild(li)
    })

    if (isLoggedIn()) {
      // Ensure Profile is added only once
      if (!navMenu.querySelector('.profile-button')) {
        const profileLi = document.createElement('li')
        profileLi.innerHTML = `
          <a href="/profile" class="profile-button">
            <img src="assets/profile.png" alt="Profile" class="profile-icon">
          </a>
        `
        profileLi.querySelector('a').addEventListener('click', (e) => {
          navigate(
            e,
            routes.find((route) => route.path === '/profile')
          )
          closeMenu()
        })
        navMenu.appendChild(profileLi)
      }
    }
  }

  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle('active')
    burgerButton.textContent = isOpen ? '✖' : '☰'
  }

  const closeMenu = () => {
    navMenu.classList.remove('active')
    burgerButton.textContent = '☰'
  }

  burgerButton.addEventListener('click', toggleMenu)

  window.addEventListener('storage', renderLinks)

  let lastScrollY = window.scrollY
  window.addEventListener('scroll', () => {
    if (!navMenu.classList.contains('active')) {
      header.classList.toggle('hidden', window.scrollY > lastScrollY)
      lastScrollY = window.scrollY
    }
  })

  renderLinks()
  document.body.appendChild(header)
}
