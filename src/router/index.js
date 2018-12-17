import { lazy } from 'react'
const Login = lazy(() => import('../components/login/Login'))
const Main = lazy(() => import('../components/main/Main'))
const User = lazy(() => import('../components/admin/User'))
const BucketList = lazy(() => import('../components/admin/BucketList'))
const BucketInfo = lazy(() => import('../components/admin/BucketInfo'))

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
        path: '/Main/User',
        component: User
      },
      {
        path: '/Main/BucketList',
        component: BucketList
      },
      {
        path: '/Main/BucketInfo/:name',
        component: BucketInfo
      }
    ]
  }
]

export default routes