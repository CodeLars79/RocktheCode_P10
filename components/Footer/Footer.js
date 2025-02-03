import './Footer.css'
import { navigate } from '../../utils/functions/navigate'
import { routes } from '../../utils/routes/routes'

export function Footer() {
  const footerElement = document.createElement('footer')
  footerElement.innerHTML = `
      <div class="footer">
          <div class="footer-container">
              <div class="footer-section about-us">
                  <h4>POPSWAP</h4>
                  <p>
                      Make swapping simple and fun while promoting sustainability and fostering connections!
                  </p>
              </div>
              <div class="footer-section quick-links">
                  <h4>Quick Links</h4>
                  <ul>
                      <li><a href="/" data-route="/">Home</a></li>
                      <li><a href="/about" data-route="/about">About</a></li>
                      <li><a href="/events" data-route="/events">Events</a></li>
                      <li><a href="mailto:someone@popswap.com">Contact</a></li>
                   </ul>
              </div>
                <div class="footer-section social-media">
                  <h4>Follow Us</h4>
                  <div class="social-icons">
                      <a href="https://facebook.com" target="_blank"><img src="./assets/icon_facebook.svg" alt="facebook"></a>
                      <a href="https://instagram.com" target="_blank"><img src="./assets/icon_instagram.svg" alt="instagram"></a>
                      <a href="https://linkedin.com" target="_blank"><img src="./assets/icon_linkedin.svg" alt="linkedin"></a>
                      <a href="https://pinterest.com" target="_blank"><img src="./assets/icon_pinterest.svg" alt="pinterest"></a></a>
                  </div>
              </div>
          </div>
          <div class="footer-bottom">
              <p>&copy; 2025 POPSWAP | All Rights Reserved</p>
          </div>
      </div>
  `

  const links = footerElement.querySelectorAll('[data-route]')
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const route = routes.find(
        (r) => r.path === link.getAttribute('data-route')
      )
      if (route) {
        navigate(e, route)
      }
    })
  })

  document.body.appendChild(footerElement)
}
