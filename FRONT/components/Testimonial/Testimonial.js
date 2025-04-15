import './Testimonial.css'

export const Testimonial = () => {
  const testimonialData = [
    {
      image: './assets/testimonial1.JPG',
      message: 'This platform is a dream come true for collectors!',
      author: 'Jess, vintage toy collector'
    },
    {
      image: './assets/testimonial2.JPG',
      message: "I found a rare vinyl I've been searching for!",
      author: 'Sam, vinyl enthusiast'
    },
    {
      image: './assets/testimonial3.JPG',
      message: 'POPSWAP helped me meet amazing book lovers.',
      author: 'Rina, rare book collector'
    }
  ]

  const section = document.createElement('section')
  section.classList.add('testimonial-container')

  const heading = document.createElement('h3')
  heading.classList.add('testimonial-text')
  heading.textContent = 'HAPPY SWAPPERS!'
  section.appendChild(heading)

  const wrapper = document.createElement('div')
  wrapper.classList.add('testimonial-wrapper')

  testimonialData.forEach(({ image, message, author }) => {
    const div = document.createElement('div')
    div.classList.add('testimonial')

    div.innerHTML = `
      <img src="${image}" alt="${author}" class="testimonial-image">
      <p class="testimonial-message">"${message}"</p>
      <h4 class="testimonial-author">${author}</h4>
    `
    wrapper.appendChild(div)
  })

  section.appendChild(wrapper)
  return section
}
