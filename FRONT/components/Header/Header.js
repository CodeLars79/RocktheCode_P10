import { navigate } from '../../utils/functions/navigate'
import { routes } from '../../utils/routes/routes'
import './Header.css'

const isLoggedIn = () => !!localStorage.getItem('user')

const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  localStorage.removeItem('favorites')
  window.dispatchEvent(new Event('storage'))

  console.clear()

  const loginRoute = routes.find((route) => route.path === '/login')

  if (loginRoute) {
    navigate({ preventDefault: () => {} }, loginRoute)
  }
}

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

    console.log('Rendering nav links - User logged in:', isLoggedIn())

    const filteredRoutes = isLoggedIn()
      ? routes.filter((route) => !['/register', '/login'].includes(route.path))
      : routes.filter(
          (route) => !['/create-event', '/my-events'].includes(route.path)
        )

    console.log('Filtered Routes:', filteredRoutes)

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
      const logoutLi = document.createElement('li')
      logoutLi.innerHTML = '<button class="logout-button">LOG OUT</button>'
      logoutLi.querySelector('button').addEventListener('click', logout)
      navMenu.appendChild(logoutLi)
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
