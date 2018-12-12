import { lazy } from 'react'
const Login = lazy(() => import('../components/login/Login'))

const routes = [
  { 
    path: '/',
    component: Login,
    exact: true
  }
]

export default routes