import React from 'react'
import { getTodos, addTodo, deleteTodo } from '../api'
import TodoItem from '../components/TodoItem'
import UserDropdown from "../../comments/UserDropdown";

export default function OtherList({ user, onLogout }) {
    const [todos, setTodos] = React.useState([])
    const [name, setName] = React.useState('')
    const [comment, setComment] = React.useState('')
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)
    const users = ["Guillaume", "Mireille", "Aurelie"];


    async function load() {
        setLoading(true)
        try {
            const data = await getTodos(user.id)
            setTodos(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        load()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function handleAdd(e) {
        e.preventDefault()
        if (!name.trim()) return
        try {
            const newTodo = await addTodo(user.id, name.trim(), comment)
            setTodos((t) => [...t, newTodo])
            setName('')
            setComment('')
        } catch (err) {
            setError(err.message)
        }
    }

    async function handleDelete(id) {
        try {
            await deleteTodo(user.id, id)
            setTodos((t) => t.filter((x) => x.id !== id))
        } catch (err) {
            setError(err.message)
        }
    }

    async function handleEdit(id, name, comment) {
        try {
            await fetch(`/api/todos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, name: name, comment: comment })
            });

            setTodos((t) =>
                t.map((todo) => (todo.id === id ? { ...todo, name: name, comment: comment } : todo))
            );
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div style={{ maxWidth: 640, margin: '24px auto', padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Liste de noel de {user.name} </h2>
                <div>
                    <button onClick={onLogout}>Se déconnecter</button>
                </div>
            </div>
        </div>
    )
}
