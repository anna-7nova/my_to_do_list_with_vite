import { Main } from '@/app/Main'
import { Login } from '@/features/auth/ui/Login/Login'
import { Route, Routes } from 'react-router'
import { PageNotFound } from '../components/PageNotFound'
import { useAppSelector } from '../hooks'
import { selectIsLoggedIn } from '@/features/auth/model/auth-slice'
import { Faq } from '../components/Faq/Faq'
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute'

export const Path = {
  Main: '/',
  Login: 'login',
  Faq: '/faq',
  NotFound: '*',
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  return (
    <Routes>
      <Route path={Path.Main} element={<ProtectedRoute isAllowed={isLoggedIn} />}>
        <Route index element={<Main />} />
        <Route path={Path.Faq} element={<Faq />} />
      </Route>

      <Route
        path={Path.Login}
        element={
          <ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Main}>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}
