import React, {useState, useEffect} from "react";
import {
    Box,
    AppBar,
    Toolbar,
    Drawer,
    CssBaseline,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import RedeemIcon from "@mui/icons-material/Redeem";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import OtherListePage from "./OtherListePage";
import {allUsers, drawerWidth, itemMock} from "../utils/data";
import {exportToCSV} from "../utils/export";
import {getItems} from "../api";

export default function MainLayout({user, onLogout}) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [allItemList, setAllItemList] = useState([]);
    const [currentUserList, setCurrentUserList] = useState([]);
    const [otherUsersList, setOtherUsersList] = useState([]);
    const [selectedMenuUserId, setSelectedMenuUserId] = useState(user.id);

    useEffect(() => {
        getItems().then(
            res => {
                setAllItemList(res);
                setCurrentUserList(res.filter(r => r.userId === user.id));
                setOtherUsersList(res.filter(r => r.userId !== user.id));
            });
    }, []);

    useEffect(() => {
        setCurrentUserList(allItemList.filter(r => r.userId === user.id));
        setOtherUsersList(allItemList.filter(r => r.userId !== user.id));
    }, [user.id]);

    const currentUserListeCallBack = list => setCurrentUserList(list);
    const otherUserListeCallBack = list => setOtherUsersList(list);
    const getOtherUsers = () => allUsers.filter(u => u.id !== user.id);

    const drawer = (
        <div>
            <Toolbar/>
            <Divider/>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => exportToCSV(allItemList, "liste_cadeau.csv")}>
                        <ListItemIcon><FileDownloadIcon/></ListItemIcon>
                        <ListItemText primary="Export CSV"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => setSelectedMenuUserId(user.id)}>
                        <ListItemIcon><EditIcon/></ListItemIcon>
                        <ListItemText primary="Ma liste"/>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider/>
            <List>
                {getOtherUsers().map(u => (
                    <ListItem key={u.id} disablePadding>
                        <ListItemButton onClick={() => setSelectedMenuUserId(u.id)}>
                            <ListItemIcon><RedeemIcon/></ListItemIcon>
                            <ListItemText primary={u.name}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline/>
            <AppBar position="fixed" sx={{width: {sm: `calc(100% - ${drawerWidth}px)`}, ml: {sm: `${drawerWidth}px`}}}>
                <Toolbar>
                    <IconButton color="inherit" edge="start" sx={{mr: 2, display: {sm: "none"}}}
                                onClick={() => setMobileOpen(prev => !prev)}>
                        <MenuIcon/>
                    </IconButton>
                    <PersonIcon/> {user.name}
                    <Button sx={{ml: 3}} variant="contained" onClick={onLogout}>Me déconnecter</Button>
                </Toolbar>
            </AppBar>

            <Box component="nav" sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}>
                <Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)}
                        sx={{display: {xs: "block", sm: "none"}, '& .MuiDrawer-paper': {width: drawerWidth}}}>
                    {drawer}
                </Drawer>
                <Drawer variant="permanent"
                        sx={{display: {xs: "none", sm: "block"}, '& .MuiDrawer-paper': {width: drawerWidth}}} open>
                    {drawer}
                </Drawer>
            </Box>

            <Box component="main" sx={{flexGrow: 1, p: 1, width: {sm: `calc(100% - ${drawerWidth}px)`}}}>
                <Toolbar/>
                <OtherListePage
                    user={selectedMenuUserId === user.id ? user : allUsers.find(u => u.id === selectedMenuUserId)}
                    currentList={selectedMenuUserId === user.id ? currentUserList : otherUsersList.filter(l => l.userId === selectedMenuUserId)}
                    updateCB={selectedMenuUserId === user.id ? currentUserListeCallBack : otherUserListeCallBack}
                    isListOwner={selectedMenuUserId === user.id}
                />
            </Box>
        </Box>
    );
}
