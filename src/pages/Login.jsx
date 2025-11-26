import React from 'react'
import UserDropdown from "../../comments/UserDropdown";
import {Grid, Typography} from "@mui/material";
import {ScrambledTitle} from "../components/ScrambledTitle";
import {allUser} from "../utils/allUser";
import {loginByName} from "../api";

export default function Login({onLogin}) {
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    async function handleSubmit(name) {
        setError(null)
        setLoading(true)
        try {
            const data = await loginByName(name.trim())
            // const data = {id: 1, name: "Guillaume"};
            onLogin(data)
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
        >
            <h1>
                <ScrambledTitle/>
            </h1>
            <Grid container flex={8} flexDirection={"column"} alignItems={"center"}>
                <h2>Je suis</h2>
                <form onSubmit={handleSubmit}>
                    {loading && <p>Connexion... </p>}
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    <UserDropdown userList={allUser} onSelect={handleSubmit}></UserDropdown>
                </form>
            </Grid>
        </Grid>
    )
}
