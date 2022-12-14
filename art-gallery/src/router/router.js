import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ArtworksView from '@/views/ArtworksView'
import CultureView from '@/views/CultureView'
import ExhibitionsView from '@/views/ExhibitionsView'
import SignUpView from '@/views/SignUpView'
import AboutView from '@/views/AboutView'
import ContactView from '@/views/ContactView'
import LoginView from '@/views/LoginView'
import ArtistDayView from '@/views/ArtistDayView'
import ArtworkDayView from '@/views/ArtworkDayView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/artworks',
    name: 'artworks',
    component: ArtworksView
  },
  {
    path: '/culture',
    name: 'culture',
    component: CultureView
  },
  {
    path: '/exhibition',
    name: 'exhibition',
    component: ExhibitionsView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/artistofday',
    name: 'artistofday',
    component: ArtistDayView
  },
  {
    path: '/artworkofday',
    name: 'artworkofday',
    component: ArtworkDayView
  },
  {
    // Currently restricted view for auth testing
    path: '/contact',
    name: 'contact',
    component: ContactView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
