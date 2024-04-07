import { useState } from 'react'

export const useUserContext = () => {
    const [error, setError] = useState(null)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(null)

    const addUser = async (email, password,firstName, lastName, addressLine1, addressLine2, contact, role) => {
        setIsLoading(true)
        setError(null)

        fetch('http://localhost:4000/api/user/addUser', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password,firstName, lastName, addressLine1, addressLine2, contact, role })
        }).then(async res  => {
            const json = await res.json();
            if (res.status === 200) {
                // save the user to local storage
                localStorage.setItem('user', JSON.stringify(json));
                // update loading state
                setIsLoading(false);
                setIsSuccess(true);
            }

            if (!res.ok) {
                setIsLoading(false);
                setError(json.error);
                setIsSuccess(false);
            }
        })
    }

    return { addUser, isLoading, error, isSuccess }
}
