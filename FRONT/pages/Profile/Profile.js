import './Profile.css'
import { createPage } from '../../utils/functions/createPage'
import { navigate } from '../../utils/functions/navigate'
import { routes } from '../../utils/routes/routes'
import { Button } from '../../components/Button/Button'
import { apiFetch } from '../../utils/functions/apiFetch'

export const Profile = () => {
  const div = createPage('profile')

  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('userId')
    localStorage.removeItem('favorites')

    window.dispatchEvent(new Event('storage'))
    navigate(
      { preventDefault: () => {} },
      routes.find((route) => route.path === '/login')
    )
  }

  const deleteProfile = async () => {
    const confirmDelete = confirm(
      'Are you sure you want to delete your profile? This action cannot be undone.'
    )

    if (!confirmDelete) return

    if (!userId) {
      alert('User ID is missing.')
      return
    }

    try {
      const result = await apiFetch(`/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      console.log('Server response:', result)

      if (result.message !== 'User deleted successfully') {
        throw new Error(result.message || 'Failed to delete profile')
      }

      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('userId')
      localStorage.removeItem('favorites')

      window.dispatchEvent(new Event('storage'))
      alert('Your profile has been deleted. Hope to see you back soon!')
      navigate(
        { preventDefault: () => {} },
        routes.find((route) => route.path === '/register')
      )
    } catch (error) {
      console.error('Delete profile error:', error)
      alert(`Error: ${error.message}`)
    }
  }

  div.innerHTML = `
    <section class="profile-container">
      <img src="assets/hand.png" alt="Hello" class="hand-icon">
      <h3>HI, POPSWAPPER!</h3>
    </section>
  `

  const logoutButton = Button({
    text: 'LOG OUT',
    onClick: logout
  })

  const deleteButton = Button({
    text: 'DELETE PROFILE',
    onClick: deleteProfile
  })

  div.querySelector('.profile-container').appendChild(logoutButton)
  div.querySelector('.profile-container').appendChild(deleteButton)

  return div
}
