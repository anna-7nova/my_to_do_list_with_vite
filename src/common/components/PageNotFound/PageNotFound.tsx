import { NavLink } from 'react-router'
import { NavButton } from '../NavButton/NavButton'
import styles from './PageNotFound.module.css'
import { Path } from '@/common/routing/Routing'

export const PageNotFound = () => (
  <div className={styles.wraper}>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <NavButton component={NavLink} to={Path.Main} color="inherit" variant="outlined">
      Вернуться на главную
    </NavButton>
  </div>
)
