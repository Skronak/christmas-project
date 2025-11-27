export const onRequestGet = async ({env}) => {
    try {
        let stmt = "";
            stmt = env.DB.prepare('SELECT id, userId, name, comment, done, doneby, doneComment FROM liste');
        const result = await stmt.all();
        const rows = result.results || []
        return new Response(JSON.stringify(rows), {status: 200})
    } catch (err) {
        return new Response(JSON.stringify({message: err.message}), {status: 500})
    }
}

export const onRequestPost = async ({request, env}) => {
    try {
        console.log(request);
        const body = await request.json()
        const {userId, name, comment} = body || {}
        if (!userId || !name) return new Response(JSON.stringify({message: 'userId and text required'}), {status: 400})

        const stmt = env.DB.prepare('INSERT INTO liste(userId, name, comment) VALUES (?, ?, ?)')
        const result = await stmt.bind(userId, name, comment).run();

        return new Response(JSON.stringify({id: result.lastRowId, userId, name}), {status: 201})
    } catch (err) {
        console.log(err);

        return new Response(JSON.stringify({message: err.message}), {status: 500})
    }
}

export const onRequestDelete = async ({request, env}) => {
    try {
        if (request.method !== 'DELETE') return new Response(null, {status: 405})
        const body = await request.json();
        const id = body.id
        const userId = body.userId
        if (!userId) return new Response(JSON.stringify({message: 'userId required'}), {status: 400})

        // Sécurité : supprimer seulement si l'item appartient à l'user
        const check = env.DB.prepare('SELECT id FROM liste WHERE id = ? AND userId = ?').bind(id, userId)
        const row = await check.first()
        if (!row) return new Response(JSON.stringify({message: 'Not found or not allowed'}), {status: 404})

        const stmt = env.DB.prepare('DELETE FROM liste WHERE id = ? AND userId = ?')
        await stmt.bind(id, userId).run()

        return new Response(JSON.stringify({success: true}), {status: 200})
    } catch (err) {
        console.log(err)
        return new Response(JSON.stringify({message: err.message}), {status: 500})
    }
}

export async function onRequestPut({request, env}) {
    const body = await request.json();
    const {id, userId, ...fieldsToUpdate} = body;

    if (!id || !userId) {return new Response(JSON.stringify({message: "id and userId are required"}), {status: 400});
    }

    // Vérifier que l’item existe et appartient à l’utilisateur
    const check = await env.DB.prepare("SELECT id FROM liste WHERE id = ? AND userId = ?")
        .bind(id, userId)
        .first();
    if (!check) {
        return new Response(JSON.stringify({message: "Not found or unauthorized"}), {status: 404});
    }

    // Préparation des champs à mettre à jour
    const columns = Object.keys(fieldsToUpdate);
    if (columns.length === 0) {
        return new Response(JSON.stringify({message: "No fields to update"}), {status: 400});
    }

    const placeholders = columns.map(col => `${col} = ?`).join(", ");

    // Exécution du UPDATE
    const stmt = env.DB.prepare(`UPDATE liste SET ${placeholders} WHERE id = ? AND userId = ?`
    );

    const values = [
        ...columns.map(col => fieldsToUpdate[col]),
        id,
        userId
    ];

    await stmt.bind(...values).run();

    return new Response(JSON.stringify({success: true, updated: fieldsToUpdate}), {status: 200});

}
