import './About.css'
import { createPage } from '../../utils/functions/createPage'
import { Arrow } from '../../components/Arrow/Arrow'

export const About = () => {
  const div = createPage('about')

  div.innerHTML = `
    <div class="about-front">
      <img src="assets/about_bg.JPG" alt="Background" class="about-background">
      <h2>WHY POPSWAP?</h2>
    </div>
    
    <section class="main-container">
      <div class="description"> 
        <img src="./assets/handshake.png" alt="handshake">
        <h3>CONNECT</h3>
        <p>POPSWAP is more than just a platform—it's a celebration of the passion for collecting and a commitment to sustainability. Whether you're into vinyl records, vintage toys, rare books, or one-of-a-kind clothing, POPSWAP brings together a community of enthusiasts who value unique items and the stories they hold.</p>
      </div>
      <div class="description"> 
        <img src="./assets/recycle.png" alt="recycle">
        <h3>PROMOTE CIRCULARITY</h3>
        <p>Our mission is to create a vibrant, sustainable space where collectors can connect, exchange treasures, and extend the lifecycle of cherished objects. By swapping, selling, or showcasing your collections, you're not just finding new homes for beloved items—you're promoting circularity and reducing waste.</p>
      </div>
      <div class="description"> 
        <img src="./assets/heart.png" alt="heart">
        <h3>MAKE A POSITIVE IMPACT</h3>
        <p>POPSWAP believes that the art of collecting goes hand in hand with thoughtful, sustainable choices. Join us to rediscover the joy of sharing, trading, and preserving items that matter, while making a positive impact on the planet.</p>
      </div>
    </section>
  `

  const arrow = Arrow()

  div.querySelector('.about-front').appendChild(arrow)

  return div
}

export default About
