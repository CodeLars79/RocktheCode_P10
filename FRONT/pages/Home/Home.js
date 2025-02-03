import './Home.css'
import { createPage } from '../../utils/functions/createPage'
import { Button } from '../../components/Button/Button'

export const Home = () => {
  const div = createPage('home')
  div.innerHTML = `
  <section class="hero-container">
    <img src="./assets/logo.png" alt="Popswap logo">
    <h1>POPSWAP</h1>
    <h2>We cater to passionate collectors of all kinds—whether it's vinyl records, vintage toys, rare books, or unique clothing. POPSWAP is designed to celebrate the art of collecting and provides a vibrant space for users to meet, swap, buy, sell, and showcase their treasured collections.</h2>
  </section>
  <section class="main-container">
    <div class="description"> 
    <img src="./assets/phone.png" alt="phone">
    <h3>Discover Events</h3>
    <p>Browse a wide range of swap events tailored to your interests. Find local or virtual events where you can swap treasures with others.</p></div>
    <div class="description">
    <img src="./assets/idea.png" alt="idea">
    <h3>Create Events</h3>
    <p>Got an idea for a swap? Host your own event and bring the community together to exchange unique items.</p></div>
    <div class="description"> 
    <img src="./assets/people.png" alt="people">
    <h3>Join the Community</h3>
    <p>Register for free to start exploring, participating, and connecting with fellow swappers.</p></div>
  </section>
  `

  const mainContainer = div.querySelector('.main-container')
  if (mainContainer) {
    const getStartedButton = Button({
      text: 'GET STARTED',
      onClick: () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
    })
    mainContainer.appendChild(getStartedButton)
  }
}
