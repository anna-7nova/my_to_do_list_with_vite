import React from 'react'
import { NavButton } from '../NavButton/NavButton'
import { NavLink } from 'react-router'
import { Path } from '@/common/routing/Routing'

export const Faq: React.FC = () => {
  return (
    <div>
      <h1>Faq</h1>
      <NavButton component={NavLink} to={Path.Main} color="inherit" variant="outlined">
        Вернуться на главную
      </NavButton>
    </div>
  )
}
