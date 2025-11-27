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
    TableRow
} from "@mui/material";
import RowOther from "../components/RowOther";
import {addItem, deleteItem, updateItems} from "../api";

export default function OtherListePage({ user, currentList, updateCB, isListOwner }) {
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
        const updatedItem = await updateItems(item);
        const updated = currentItems.map(i => i.id === updatedItem.id ? updatedItem : i);
        setCurrentItems(updated);
        updateCB(updated);
    };

    return (
        <>
            {isListOwner && (
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <TextField size="small" label="Nom" value={name} onChange={e => setName(e.target.value)} />
                    <TextField size="small" label="Commentaire" value={comment} onChange={e => setComment(e.target.value)} />
                    <Button variant="contained" onClick={handleAdd}>Ajouter</Button>
                </Box>
            )}
            <h2>Liste de {user.name}</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
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
                            <RowOther
                                key={item.id}
                                item={item}
                                onSubmit={handleSubmit}
                                onDelete={handleDelete}
                                isOwner={isListOwner}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
