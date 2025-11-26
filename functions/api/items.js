export const onRequestGet = async ({ request, env }) => {
    try {
        const url = new URL(request.url)
        const userId = url.searchParams.get('userId')
        const all = url.searchParams.get('all')

        let stmt = "";
        if (all==='true') { // tout sauf liste utilisateur courant
            stmt = env.DB.prepare('SELECT id, userId, name, comment, done, doneby, doneComment FROM liste WHERE userId <> ?');
        } else {
            stmt = env.DB.prepare('SELECT id, userId, name, comment FROM liste WHERE userId = ? ORDER BY rowid');
        }
        const result = await stmt.bind(userId).all()
        const rows = result.results || []
        return new Response(JSON.stringify(rows), { status: 200 })
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message }), { status: 500 })
    }
}

export const onRequestPost = async ({ request, env }) => {
    try {
        console.log(request);
        const body = await request.json()
        const { userId, name, comment } = body || {}
        if (!userId || !name) return new Response(JSON.stringify({ message: 'userId and text required' }), { status: 400 })

        const stmt = env.DB.prepare('INSERT INTO liste(userId, name, comment) VALUES (?, ?, ?)')
        const result = await stmt.bind(userId, name, comment).run();

        return new Response(JSON.stringify({ id: result.lastRowId, userId, name }), { status: 201 })
    } catch (err) {
        console.log(err);

        return new Response(JSON.stringify({ message: err.message }), { status: 500 })
    }
}

export const onRequestDelete = async ({ request, env }) => {
    try {
        if (request.method !== 'DELETE') return new Response(null, { status: 405 })
        const body = await request.json();
        const id = body.id
        const userId = body.userId
        if (!userId) return new Response(JSON.stringify({ message: 'userId required' }), { status: 400 })

        // Sécurité : supprimer seulement si l'item appartient à l'user
        const check = env.DB.prepare('SELECT id FROM liste WHERE id = ? AND userId = ?').bind(id, userId)
        const row = await check.first()
        if (!row) return new Response(JSON.stringify({ message: 'Not found or not allowed' }), { status: 404 })

        const stmt = env.DB.prepare('DELETE FROM liste WHERE id = ? AND userId = ?')
        await stmt.bind(id, userId).run()

        return new Response(JSON.stringify({ success: true }), { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response(JSON.stringify({ message: err.message }), { status: 500 })
    }
}

export async function onRequestPut({ request, env }) {
    console.log(request.body);

    const body = await request.json();
    const { id, userId, name, comment } = body;
    if (!userId || !name) return new Response(JSON.stringify({ message: "userId and name required" }), { status: 400 });
console.log(name);
console.log(comment);
    // Vérifie que le todo appartient bien à l'utilisateur
    const check = await env.DB.prepare("SELECT id FROM liste WHERE id = ? AND userId = ?")
        .bind(id, userId)
        .first();
    if (!check) return new Response(JSON.stringify({ message: "Not found or not allowed" }), { status: 404 });

    await env.DB.prepare("UPDATE liste SET name = ?, comment=? WHERE id = ? AND userId = ?")
        .bind(name, comment, id, userId)
        .run();

    return new Response(JSON.stringify({ success: true, id, name, comment }), { status: 200 });
}
