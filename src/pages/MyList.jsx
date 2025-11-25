import React, {useState} from 'react'
import {getTodos, addTodo, deleteTodo} from '../api'
import TodoItem from '../components/TodoItem'
import {Button, TextField} from "@mui/material";
import TodoItemOther from "../components/TodoItemOther";

export default function MyList({user, currentList, isListOwner}) {
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
            await deleteTodo(user.id, id)
            setGiftCurrent((t) => t.filter((x) => x.id !== id))
        } catch (err) {
            setError(err.message)
        }
    }

    async function handleEdit(id, name, comment) {
        try {
            await fetch(`/api/todos`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id: id, userId: user.id, name: name, comment: comment})
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
            {error && <div style={{color: 'red'}}>{error}</div>}

            {isListOwner ? (
                <>
                    <form onSubmit={handleAdd} style={{marginTop: 12}}>
                        <TextField id="outlined-basic" label="nom" variant="outlined" value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                        <TextField id="outlined-basic" label="commentaire" variant="outlined" value={comment}
                                   onChange={(e) => setComment(e.target.value)}/>
                        <Button type="submit" variant="contained">Ajouter</Button>
                    </form>

                    <div style={{marginTop: 20}}>
                        {giftCurrent.map((t) => (
                            <TodoItem key={t.id} todo={t} onEdit={handleEdit}/>
                        ))}
                    </div>
                </>) : (
                <>
                    <div style={{marginTop: 20}}>
                        {giftCurrent.length === 0 && "Rien de renseigné pour le moment"}
                        {giftCurrent.map((t) => (
                            <TodoItemOther key={t.id} item={t} onEdit={handleEdit}/>
                        ))}
                    </div>
                </>
            )
            }
        </div>
    )
}
