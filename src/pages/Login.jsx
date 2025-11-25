import React from 'react'
import {loginByName} from '../api'
import UserDropdown from "../../comments/UserDropdown";

export default function Login({onLogin}) {
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const users = ["Guillaume", "Mireille", "Aurelie"];

    async function handleSubmit(name) {
        setError(null)
        setLoading(true)
        try {
            const data = await loginByName(name.trim())
            onLogin(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{maxWidth: 420, margin: '40px auto', padding: 20}}>
            <h1>Liste de noel</h1>

            <h1>Se connecter en tant que</h1>
            <form onSubmit={handleSubmit}>
                {loading ? 'Connexion...' : 'selectionner un élement dans la liste pour commencer'}
                <UserDropdown userList={users} onSelect={handleSubmit}></UserDropdown>
                {error && <p style={{color: 'red'}}>{error}</p>}
            </form>
        </div>
    )
}
