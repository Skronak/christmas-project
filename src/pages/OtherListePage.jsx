import React, {useEffect, useState} from 'react'
import {addItem, deleteItem, updateItems} from '../api'
import Row from '../components/Row'
import {Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@mui/material";
import Paper from "@mui/material/Paper";
import RowOther from "../components/RowOther";

export default function OtherListePage({user, currentList, isListOwner, updateCB}) {
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')
    const [error, setError] = useState(null)
    const [currentItems, setCurrentItems] = useState(currentList)

    // Effet de CB des usestate
    useEffect(() => {
        updateCB(currentItems);
    }, [currentItems]);

    async function handleSubmit(id, name, comment) {
        try {
            const res = await updateItems(user, id, name, comment);
            setCurrentItems(currentItems.map((item) => (item.id === res.id ? {
                ...item,
                name: res.name,
                comment: res.comment
            } : item)));
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            {error && <div style={{color: 'red'}}>{error}</div>}
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650, tableLayout: "fixed"}} aria-label="simple table">
                    <TableHead sx={{'& .MuiTableCell-root': {fontWeight: 'bold'}}}>
                        <TableRow>
                            <TableCell align="left">Nom</TableCell>
                            <TableCell align="left">Commentaire</TableCell>
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentItems.map((t) => (
                            <RowOther key={t.id} item={t} onEdit={handleSubmit}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
