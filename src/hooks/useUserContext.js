import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useUserContext = () => {
    const [error, setError] = useState(null)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const addUser = async (email, password,firstName, lastName, addressLine1, addressLine2, contact, role) => {
        setIsLoading(true)
        setError(null)

        fetch('http://localhost:4000/api/user/addUser', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password,firstName, lastName, addressLine1, addressLine2, contact, role })
        }).then(res  => {
            if (res.status === 200) {
                // save the user to local storage
                localStorage.setItem('user', JSON.stringify(res.json()));
                // update the auth context
                dispatch({type: 'LOGIN', payload: res.json()});
                // update loading state
                setIsLoading(false);
                setIsSuccess(true);
            }
        }).catch(err => {
            setIsLoading(false);
            setError(err);
            setIsSuccess(false);
        })
    }

    return { addUser, isLoading, error, isSuccess }
}
