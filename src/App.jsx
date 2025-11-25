import React from 'react'
import Login from './pages/Login'
import MyList from './pages/MyList'
import MainLayout from "./pages/MainLayout";

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

    if (!user) return <Login onLogin={setUser} />
    return <MainLayout user={user} onLogout={() => setUser(null)} />
}

export default App
