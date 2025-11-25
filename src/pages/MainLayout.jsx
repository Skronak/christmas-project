import React from 'react'
import {Box, Button, Tab} from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MyList from "./MyList";
import {getTodos} from "../api";
import {allUser} from "../utils/allUser";

export default function MainLayout({user, onLogout}) {
    const allUsers = allUser;
    const [activeTab, setActiveTab] = React.useState(0);
    const [giftCurrentUser, setGiftCurrentUser] = React.useState([])
    const [giftOtherUsers, setGiftOtherUsers] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [loadingOther, setLoadingOther] = React.useState(false)

    async function loadCurrentGifts() {
        setLoading(true)
        try {
            const data = await getTodos(user.id, false);
            // const data = [
            //     {id: 1, userId: 1, name: "Chausson", comment: "cest fait", done: 0, doneBy: 0, doneComment: ""},
            //     {id: 2, userId: 1, name: "patin a glace", comment: "", done: 0, doneBy: 0, doneComment: ""},
            // ]

            setGiftCurrentUser(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const getOtherUsers = () => {
        return allUsers.filter(u => u.id !== user.id);
    }

    async function loadOtherGifts() {
        setLoadingOther(true)
        try {
            const data = await getTodos(user.id, true)
            // const data = [
            //     {id: 3, userId: 2, name: "Plante", comment: "oui", done: 0, doneBy: 0, doneComment: ""},
            //     {id: 4, userId: 2, name: "jardin suspendu", comment: "", done: 0, doneBy: 0, doneComment: ""},
            // ]
            setGiftOtherUsers(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoadingOther(false)
        }
    }

    React.useEffect(() => {
        console.log("useeffect")
        loadCurrentGifts();
        loadOtherGifts();
    }, [])

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <div>
            {loading || loadingOther ? "chargement" :
                (
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <div>
                                <Button variant="outlined" onClick={onLogout}>Me déconnecter</Button>
                            </div>
                        </div>
                        <TabContext value={activeTab}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Modifier ma liste" value={0}/>
                                    {getOtherUsers().map(userName => <Tab
                                        label={`Liste de ${userName.name}`} value={userName.id}/>)}
                                </TabList>
                                <TabPanel value={0}><MyList user={user} currentList={giftCurrentUser} isListOwner={true}/></TabPanel>
                                {getOtherUsers().map(otherUser => <TabPanel value={otherUser.id}>
                                    <MyList user={otherUser} currentList={giftOtherUsers.filter(gift=>gift.userId===otherUser.id)} isListOwner={false}/>
                                </TabPanel>)}
                            </Box>
                        </TabContext>
                    </Box>
                )}
        </div>
    )
}
