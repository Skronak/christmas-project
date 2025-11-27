import React from 'react'
import UserDropdown from "../components/UserDropdown";
import {Grid, Typography} from "@mui/material";
import {ScrambledTitle} from "../components/ScrambledTitle";
import {allUsers} from "../utils/data";
import {loginByName} from "../api";
import backgroundImg from "../images/NoelRock.png";

export default function LoginPage({onLogin}) {
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    async function handleSubmit(userId) {
        setError(null)
        setLoading(true)
        try {
            // const data = await loginByName(name.trim()) todo authentification
            const data = allUsers.filter(u => +userId === u.id)[0];
            onLogin(data);
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Grid
            container
            flexDirection="column"
            height={"100vh"}
            alignItems={"center"}
            paddingTop={"5%"}
            sx={{
                backgroundImage: `url(${backgroundImg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left bottom",
                backgroundSize: {
                    xs: "25em",   // mobile
                    sm: "25em",   // tablette
                    md: "40%",   // desktop
                    lg: "40%",   // grand écran
                },
            }}
        >
            <h1>
                <ScrambledTitle/>
            </h1>
            <Grid container flex={8} flexDirection={"column"} alignItems={"center"}>
                <h2>Je suis</h2>
                <form onSubmit={handleSubmit}>
                    {loading && <p>Connexion... </p>}
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    <UserDropdown userList={allUsers} onSelect={handleSubmit}></UserDropdown>
                </form>
            </Grid>
        </Grid>
    )
}
