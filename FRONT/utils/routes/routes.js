import { CreateEvent } from '../../pages/CreateEvent/CreateEvent'
import { MyEvents } from '../../pages/MyEvents/MyEvents'
import { Events } from '../../pages/Events/Events'
import { Home } from '../../pages/Home/Home'
import { Login } from '../../pages/Login/Login'
import { Register } from '../../pages/Register/Register'
import { About } from '../../pages/About/About'
import { Profile } from '../../pages/Profile/Profile'

export const routes = [
  {
    path: '/',
    text: 'P / S',
    page: Home
  },
  {
    path: '/about',
    text: 'ABOUT',
    page: About
  },
  {
    path: '/events',
    text: 'EVENTS',
    page: Events
  },
  {
    path: '/create-event',
    text: 'CREATE EVENT',
    page: CreateEvent
  },
  { path: '/my-events', text: 'MY EVENTS', page: MyEvents },
  {
    path: '/register',
    text: 'SIGN UP',
    page: Register
  },
  {
    path: '/login',
    text: 'LOGIN',
    page: Login
  },
  {
    path: '/profile',
    text: 'PROFILE',
    page: Profile
  }
]
