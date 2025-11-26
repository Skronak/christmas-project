import React from 'react'
import {AppBar, Box, Button, Tab, Toolbar, Typography} from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MaListePage from "./MaListePage";
import PersonIcon from '@mui/icons-material/Person';
import {allUser} from "../utils/allUser";
import {getItems} from "../api";

export default function MainLayout({user, onLogout}) {
    const allUsers = allUser;
    const [activeTab, setActiveTab] = React.useState(0);
    const [currentUserList, setCurrentUserList] = React.useState([])
    const [giftOtherUsers, setGiftOtherUsers] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [loadingOther, setLoadingOther] = React.useState(false)

    async function loadCurrentGifts() {
        setLoading(true)
        try {
            const res = await getItems(user.id, false)
            // const data = [
            //     {id: 1, userId: 1, name: "Chausson", comment: "cest fait", done: 0, doneBy: 0, doneComment: ""},
            //     {id: 2, userId: 1, name: "patin a glace", comment: "", done: 0, doneBy: 0, doneComment: ""},
            // ]
            setCurrentUserList(res);
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
            const data = await getItems(user.id, true)
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
        loadCurrentGifts();
        loadOtherGifts();
    }, [])

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const currentUserListeCallBack = (list) => {
        setCurrentUserList(list);
    }

    return (
        <>
        <AppBar position="static" sx={{ backgroundColor: '#F54927' }}>
            <Toolbar>
                <PersonIcon/>{user.name}<Button variant="contained" onClick={onLogout} sx={{ ml: 'auto', backgroundColor: '#9C2007'}} >Me déconnecter</Button>
            </Toolbar>
        </AppBar>
            {loading || loadingOther ? "chargement" :
                (
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <TabContext value={activeTab}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList onChange={handleChange} aria-label="liste" variant="scrollable">
                                    <Tab label="Modifier ma liste" value={0}/>
                                    {getOtherUsers().map(userName => <Tab
                                        label={`Liste de ${userName.name}`} value={userName.id}/>)}
                                </TabList>
                                <TabPanel value={0}><MaListePage user={user} currentList={currentUserList} isListOwner={true} updateCB={currentUserListeCallBack}/></TabPanel>
                                {getOtherUsers().map(otherUser => <TabPanel value={otherUser.id}>
                                    {/*<MaListePage user={otherUser} currentList={giftOtherUsers.filter(gift=>gift.userId===otherUser.id)} isListOwner={false}/>*/}
                                </TabPanel>)}
                            </Box>
                        </TabContext>
                    </Box>
                )}
        </>
    )
}
