export const navigate = (e, route) => {
  e.preventDefault()
  window.history.pushState('', '', route.path)
  route.page()

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })

  window.dispatchEvent(new Event('popstate'))
}
