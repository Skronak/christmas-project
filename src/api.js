// endpoints appelés depuis le frontend.
// Cloudflare Pages Functions exposés sous /api/*

const apiBase = '/api'

export async function loginByName(name) {
    const res = await fetch(`${apiBase}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
    })
    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || 'Login failed')
    }
    return res.json()
}

export async function getTodos(userId, all) {
    const res = await fetch(`${apiBase}/todos?userId=${encodeURIComponent(userId)}&all=${all}`)
    if (!res.ok) throw new Error('Failed to load todos')
    return res.json()
}

export async function addTodo(userId, name, comment) {
    const res = await fetch(`${apiBase}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, name, comment }),
    })
    if (!res.ok) throw new Error('Failed to add todo')
    return res.json()
}

export async function deleteTodo(userId, id) {
    const res = await fetch(`${apiBase}/todos`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userId, id: id }),
    })
    if (!res.ok) throw new Error('Failed to delete todo')
    return res.json()
}
