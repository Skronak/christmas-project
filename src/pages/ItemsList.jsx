import React from 'react'
import {addTodo, deleteItem} from '../api'
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Paper from '@mui/material/Paper';

export default function ItemsList({user, currentList, isListOwner}) {
    const [name, setName] = React.useState('')
    const [comment, setComment] = React.useState('')
    const [item, setItem] = React.useState({});
    const [error, setError] = React.useState(null)
    const [giftCurrent, setGiftCurrent] = React.useState([])

    React.useEffect(() => {
        setGiftCurrent(currentList);
    }, [currentList])

    async function handleAdd(e) {
        e.preventDefault()
        if (!name.trim()) return
        try {
            const newTodo = await addTodo(user.id, name.trim(), comment)
            setGiftCurrent((t) => [...t, newTodo])
            setName('')
            setComment('')
        } catch (err) {
            setError(err.message)
        }
    }

    async function handleDelete(id) {
        try {
            await deleteItem(user.id, id)
            setGiftCurrent((t) => t.filter((x) => x.id !== id))
        } catch (err) {
            setError(err.message)
        }
    }

    async function handleEdit(id, name, comment) {
        try {
            await fetch(`/api/todos/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({userId: user.id, name: name, comment: comment})
            });

            setGiftCurrent((t) =>
                t.map((todo) => (todo.id === id ? {...todo, name: name, comment: comment} : todo))
            );
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nom</TableCell>
                            <TableCell align="right">Commentaire</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentList.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.comment}</TableCell>
                                <TableCell align="right"><Button variant="contained">
                                    Modifier
                                </Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" color="error" onClick={() => onDelete(todo.id)}>
                                        Supprimer
                                    </Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer></div>
    )
}
