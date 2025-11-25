import React from 'react'
import {loginByName} from '../api'
import UserDropdown from "../../comments/UserDropdown";
import {Grid, Typography} from "@mui/material";
import Scrambler from "../components/Scrambler";
import {allUser} from "../utils/allUser";

export default function Login({onLogin}) {
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const users = allUser;

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
            flexDirection={"column"}
            height={"100vh"}
            alignItems={"center"}
            paddingTop={"5%"}
        >
            <Grid item flex={2}>
            <Typography><Scrambler/></Typography>
            </Grid>
            <Grid container flex={8} flexDirection={"column"} alignItems={"center"}>
                <h1>Je suis</h1>
                <form onSubmit={handleSubmit}>
                    {loading && <p>Connexion... </p>}
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    <UserDropdown userList={users} onSelect={handleSubmit}></UserDropdown>
                </form>
            </Grid>
        </Grid>
    )
}
