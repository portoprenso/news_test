import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { IRootINIT_STATE } from '../Types/NewsTypes'

export const useTypedSelector: TypedUseSelectorHook<IRootINIT_STATE> = useSelector;