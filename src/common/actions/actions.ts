import { createAction } from '@reduxjs/toolkit'

export const clearDataAC = createAction('common/clearData')

//prepare callback как второй аргумент применяется если нужно сделать еще доп.логику с входящими данными
