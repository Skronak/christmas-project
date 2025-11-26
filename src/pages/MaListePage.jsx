import React, {useEffect, useState} from 'react'
import {addItem, deleteItem, updateItems} from '../api'
import Row from '../components/Row'
import {Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@mui/material";
import TodoItemOther from "../components/TodoItemOther";
import Paper from "@mui/material/Paper";

export default function MaListePage({user, currentList, isListOwner, updateCB}) {
    const [name, setName] = React.useState('')
    const [comment, setComment] = React.useState('')
    const [error, setError] = React.useState(null)
    const [currentItems, setCurrentItems] = React.useState(currentList)

    // Effet de CB des usestate
    useEffect(() => {
        updateCB(currentItems);
    }, [currentItems]);

    async function handleAdd(e) {
        e.preventDefault()
        if (!name.trim()) return
        try {
            const newTodo = await addItem(user.id, name.trim(), comment)
            setCurrentItems((t) => [...t, newTodo]);
            setName('');
            setComment('');
        } catch (err) {
            setError(err.message)
        }
    }

    async function handleDelete(id, name, comment) {
        try {
            await deleteItem(user.id, id);
            setCurrentItems((item) => item.filter((x) => x.id !== id))
        } catch (err) {
            console.error(err);
        }
    }

    async function handleSubmit(id, name, comment) {
        try {
            const res = await updateItems(user, id, name, comment);
            setCurrentItems(currentItems.map((item) => (item.id === res.id ? {...item, name: res.name, comment: res.comment} : item)));
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            {error && <div style={{color: 'red'}}>{error}</div>}

            {isListOwner ? (
                <>
                    <Box sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        marginTop: 1,
                        paddingBottom: 3,
                        marginBottom: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}>
                        <p>Nouvel élément</p>
                        <TextField size="small" id="outlined-basic" label="nom" variant="outlined" value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                        <TextField size="small" id="outlined-basic" label="commentaire" variant="outlined"
                                   value={comment}
                                   onChange={(e) => setComment(e.target.value)}/>
                        <Button type="submit" variant="contained" onClick={handleAdd}>Ajouter</Button>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650, tableLayout:"fixed"}} aria-label="simple table">
                            <TableHead sx={{'& .MuiTableCell-root': {fontWeight: 'bold'}}}>
                                <TableRow>
                                    <TableCell align="left">Nom</TableCell>
                                    <TableCell align="left">Commentaire</TableCell>
                                    <TableCell align="left">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentItems.map((t) => (
                                    <Row key={t.id} item={t} onEdit={handleSubmit} onDelete={handleDelete}/>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>) : (
                <>
                    <div style={{marginTop: 20}}>
                        {currentItems.length === 0 && "Rien de renseigné pour le moment"}
                        {currentItems.map((t) => (
                            <TodoItemOther key={t.id} item={t} onEdit={handleSubmit}/>
                        ))}
                    </div>
                </>
            )
            }
        </div>
    )
}
