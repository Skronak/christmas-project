import React, {useState} from 'react'
import {getTodos, addTodo, deleteTodo, getAllTodos} from '../api'
import TodoItem from '../components/TodoItem'
import UserDropdown from "../../comments/UserDropdown";

export default function MyList({ user, onLogout }) {
    const [todos, setTodos] = React.useState([])
    const [todosOther, setTodosOther] = React.useState([])
    const [name, setName] = React.useState('')
    const [comment, setComment] = React.useState('')
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)
    const users = ["Guillaume", "Mireille", "Aurelie"];
    const [otherListToShow, setOtherListToShow] = useState();

    async function load() {
        setLoading(true)
        try {
            const data = await getTodos(user.id, false)
            setTodos(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    async function loadOtherList() {
        try {
            const data = await getTodos(user.id, true)
            setTodosOther(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        load();
        loadOtherList();
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

    const getUsers = () => {
        return users.filter(u=>u !=user.name);
   }

    return (
        <div style={{ maxWidth: 640, margin: '24px auto', padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Liste de noel de {user.name} </h2>
                <div>
                    <button onClick={onLogout}>Se déconnecter</button>
                </div>
            </div>

            <form onSubmit={handleAdd} style={{ marginTop: 12 }}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nouvel élément"
                    style={{ width: '40%', padding: 8 }}
                />
                <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="commentaire"
                    style={{ width: '60%', padding: 8 }}
                />
                <button type="submit" style={{ marginLeft: 8 }}>Ajouter</button>
            </form>

            <div style={{ marginTop: 20 }}>
                {loading ? <div>Chargement...</div> : null}
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {todos.length === 0 && !loading ? <div>Aucun item</div> : null}
                {todos.map((t) => (
                    <TodoItem key={t.id} todo={t} onDelete={handleDelete} onEdit={handleEdit} />
                ))}
            </div>


            <div>Voir la liste de</div>
            <UserDropdown userList={getUsers()} onSelect={setOtherListToShow}></UserDropdown>
        </div>
    )
}
