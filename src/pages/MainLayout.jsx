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
    Button, Typography, styled, useTheme, Menu,
} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import RedeemIcon from "@mui/icons-material/Redeem";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import useMediaQuery from "@mui/material/useMediaQuery";

import ListePage from "./ListePage";
import {allUsers, drawerWidth, itemMock} from "../utils/data";
import {exportToCSV} from "../utils/export";
import {getItems} from "../api";

export default function MainLayout({user, onLogout}) {
    const [allItemList, setAllItemList] = useState([]);
    const [currentUserList, setCurrentUserList] = useState([]);
    const [otherUsersList, setOtherUsersList] = useState([]);
    const [selectedMenuUserId, setSelectedMenuUserId] = useState(user.id);
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(anchorEl);
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

    const openedMixin = (theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });

    const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });

    const DrawerHeader = styled('div')(({theme}) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    }));
    const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open'})(({theme}) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        variants: [
            {
                props: ({open}) => open,
                style: {
                    marginLeft: drawerWidth,
                    width: `calc(100% - ${drawerWidth}px)`,
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                },
            },
        ],
    }));

    const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
        ({theme}) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            variants: [{props: ({open}) => open, style: {...openedMixin(theme), '& .MuiDrawer-paper': openedMixin(theme)}},
                {props: ({open}) => !open, style: {...closedMixin(theme), '& .MuiDrawer-paper': closedMixin(theme)}}],
        }),
    );

    const drawerElement = (
        <>
            <List>
                <ListItemButton onClick={() => setSelectedMenuUserId(user.id)}>
                    <ListItemIcon><EditIcon/></ListItemIcon>
                    <ListItemText primary="Ma liste"/>
                </ListItemButton>
            </List>
            <Divider/>
            <List>
                {getOtherUsers().map(u => (
                    <ListItem key={u.id} disablePadding>
                        <ListItemButton onClick={() => setSelectedMenuUserId(u.id)}>
                            <ListItemIcon><RedeemIcon/></ListItemIcon>
                            <ListItemText primary={u.name}/>
                            <Typography sx={{
                                color: "rgb(141, 146, 153)",
                                width: "1em",
                                textAlign: "center"
                            }}>{otherUsersList.filter(l => l.userId === u.id).length}</Typography>
                        </ListItemButton>
                    </ListItem>
                ))}
                <Divider />
                <ListItemButton onClick={() => exportToCSV(allItemList, "liste_cadeau.csv")}>
                    <ListItemIcon><FileDownloadIcon/></ListItemIcon>
                    <ListItemText primary="Export CSV"/>
                </ListItemButton>
            </List>
        </>
    );

    return (
        <Box sx={{ display: 'flex', width: '100%', overflowX: 'hidden' }}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={()=>setOpen(true)}
                        edge="start"
                        sx={[{marginRight: 5}, open && {display: 'none'}]}>
                        <MenuIcon/>
                    </IconButton>
                    <IconButton
                        id="basic-button"
                        color={"inherit"}
                        aria-controls={menuOpen ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={menuOpen ? 'true' : undefined}
                        onClick={(evt)=>setAnchorEl(evt.currentTarget)}
                    >
                        <PersonIcon/> {user.name}
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={menuOpen}
                        onClose={()=> setAnchorEl(null)}
                        slotProps={{list: {'aria-labelledby': 'basic-button'}}}
                    >
                        <MenuItem onClick={onLogout}>Me déconnecter</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Drawer variant={"permanent"} open={open}>
                <DrawerHeader>
                    <IconButton onClick={()=>setOpen(false)}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>
                {drawerElement}
            </Drawer>

            <Box component="main" sx={{ width: isMobile ? `calc(100% - ${drawerWidth}px)` : "100%", flexGrow: 1, p: 3}}>
                <DrawerHeader/>
                <ListePage
                    user={selectedMenuUserId === user.id ? user : allUsers.find(u => u.id === selectedMenuUserId)}
                    currentList={selectedMenuUserId === user.id ? currentUserList : otherUsersList.filter(l => l.userId === selectedMenuUserId)}
                    updateCB={selectedMenuUserId === user.id ? currentUserListeCallBack : otherUserListeCallBack}
                    isListOwner={selectedMenuUserId === user.id}
                />
            </Box>
        </Box>
    );
}
