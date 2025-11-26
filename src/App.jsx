import React from 'react'
import Login from './pages/Login'
import MainLayout from "./pages/MainLayout";
import {Box} from "@mui/material";

function App() {
    const [user, setUser] = React.useState(() => {
        try {
            return JSON.parse(localStorage.getItem('user'))
        } catch (e) {
            return null
        }
    })

    React.useEffect(() => {
        if (user) localStorage.setItem('user', JSON.stringify(user))
        else localStorage.removeItem('user')
    }, [user])

    return (
        <Box sx={{flexGrow: 1}}>
            {!user ? <Login onLogin={setUser}/> : (
                <MainLayout user={user} onLogout={() => setUser(null)}/>)
            }
        </Box>
    )
}

export default App
