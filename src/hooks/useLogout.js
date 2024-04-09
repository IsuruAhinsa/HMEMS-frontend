import { useNavigate } from 'react-router-dom'
import { useAuthContext } from './useAuthContext'



export const useLogout = () => {
  const { dispatch } = useAuthContext()//const { dispatch: } = useWorkoutsContext()


  const navigate = useNavigate()  
  

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    //navigator
    navigate('/login')
  
  }

  return { logout }
}