import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    Paper,
    TableRow, Stack
} from "@mui/material";
import Row from "../components/Row";
import {addItem, deleteItem, updateItems} from "../api";

export default function ListePage({ user, currentList, updateCB, isListOwner }) {
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [currentItems, setCurrentItems] = useState(currentList ?? []);

    useEffect(() => setCurrentItems(currentList ?? []), [currentList]);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        const newItem = await addItem(user.id, name.trim(), comment);
        const updated = [...currentItems, newItem];
        setCurrentItems(updated);
        updateCB(updated);
        setName(""); setComment("");
    };

    const handleDelete = async (id) => {
        await deleteItem(user.id, id);
        const updated = currentItems.filter(i => i.id !== id);
        setCurrentItems(updated);
        updateCB(updated);
    };

    const handleSubmit = async (item) => {
        await updateItems(item);
        updateCB(currentItems);
    };

    return (
        <>
            <h2>Liste de {user.name}</h2>
            {isListOwner && (
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    sx={{ width: '100%' }}
                >
                    <TextField size="small" label="Nom" value={name} onChange={e => setName(e.target.value)}/>
                    <TextField size="small" label="Commentaire" value={comment}
                               onChange={e => setComment(e.target.value)}/>
                    <Button variant="contained" onClick={handleAdd}>Ajouter</Button>
                </Stack>
            )}
            <TableContainer component={Paper} sx={{ overflowX: 'auto', width: '100%' }}>
                <Table sx={{minWidth: 650}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nom</TableCell>
                            <TableCell>Commentaire</TableCell>
                            {!isListOwner && <TableCell>Fait</TableCell>}
                            {!isListOwner && <TableCell>Commentaire</TableCell>}
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentItems.map(item => (
                            <Row
                                key={item.id}
                                item={item}
                                onSubmit={handleSubmit}
                                onDelete={handleDelete}
                                isOwner={isListOwner}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
