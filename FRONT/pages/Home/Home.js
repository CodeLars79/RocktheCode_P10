import './Home.css'
import { createPage } from '../../utils/functions/createPage'
import { Arrow } from '../../components/Arrow/Arrow'
import { navigate } from '../../utils/functions/navigate'
import { routes } from '../../utils/routes/routes'
import { CustomAlert } from '../../components/CustomAlert/CustomAlert'
import { Testimonial } from '../../components/Testimonial/Testimonial'

export const Home = () => {
  const div = createPage('home')
  div.innerHTML = `
    <section class="home-front">
      <img src="assets/home_bg.jpg" alt="Background" class="home-background">
      <h1>POPSWAP</h1>
    </section>
    <section class="hero-container">
      <h2>We cater to passionate collectors of all kinds<br> — whether it's vinyl records, vintage toys, rare books, or unique clothing. <br><br>
      POPSWAP is designed to celebrate the art of collecting and provides a vibrant space for users to meet, swap, buy, sell, and showcase their treasured collections.</h2>
    </section>
    <h2 id="history-title">Be part of our history...</h2>
    <section class="image-container">
      <img src="assets/slide1.JPG" alt="swap-image" class="swap-image">
      <img src="assets/slide2.JPG" alt="swap-image" class="swap-image">
      <img src="assets/slide3.JPG" alt="swap-image" class="swap-image">
      <img src="assets/slide4.JPG" alt="swap-image" class="swap-image">
    </section>
    <section class="home-container">
      <div class="description"> 
        <img src="./assets/phone.png" alt="phone">
        <h3>Discover Events</h3>
        <p>Browse a wide range of swap events tailored to your interests. Find local or virtual events where you can swap treasures with others.</p>
      </div>
      <div class="description">
        <img src="./assets/idea.png" alt="idea">
        <h3>Create Events</h3>
        <p>Got an idea for a swap? Host your own event and bring the community together to exchange unique items.</p>
      </div>
      <div class="description"> 
        <img src="./assets/people.png" alt="people">
        <h3>Join the Community</h3>
        <p>Register for free to start exploring, participating, and connecting with fellow swappers.</p>
      </div>
    </section>
    <section class="start-container">
      <img src="./assets/happy.png" alt="happy face" id="happy">
      <div class="rectangle"></div> 
      <h3 class="start-text">GET STARTED NOW...</h3>
      <img src="./assets/arrow_white.svg" alt="white arrow" id="white-arrow">
      <a href="/register" data-route="/register" id="signup-link">SIGN UP</a>
      <img src="assets/home2_bg.JPG" alt="Background" class="start-background">
    </section>
  `

  const links = div.querySelectorAll('[data-route]')
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const path = link.getAttribute('data-route')
      const route = routes.find((r) => r.path === path)

      if (path === '/register' && localStorage.getItem('token')) {
        CustomAlert({
          message: 'Nice try! You already signed up 😎',
          onConfirm: () => {}
        })
        return
      }

      if (route) {
        navigate(e, route)
      } else {
        console.warn(`Route not found for path: ${path}`)
      }
    })
  })

  const homeFront = div.querySelector('.home-front')
  if (homeFront) {
    const arrowHomeFront = Arrow()
    homeFront.appendChild(arrowHomeFront)
  }

  const testimonialSection = Testimonial()
  div.appendChild(testimonialSection)

  return div
}

export default Home
