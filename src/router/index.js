import { lazy } from 'react'
const Login = lazy(() => import('../components/login/Login'))
const Main = lazy(() => import('../components/main/Main'))
const Api = lazy(() => import('../components/admin/Api'))

const routes = [
  { 
    path: '/',
    component: Login,
    exact: true
  },
  {
    path: '/Main',
    component: Main,
    routes: [
      {
        path: '/Main/Api',
        component: Api
      }
    ]
  }
]

export default routes