import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useUserContext = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const addUser = async (email, password,firstName, lastName, addressLine1, addressLine2, contact, role) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/api/user/addUser', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password,firstName, lastName, addressLine1, addressLine2, contact, role })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            // update loading state
            setIsLoading(false)
        }
    }

    return { addUser, isLoading, error }
}
