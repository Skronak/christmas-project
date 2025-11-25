export async function onRequestPost(context) {
    const { request, env } = context;

    const { name } = await request.json();

    const user = await env.DB.prepare("SELECT * FROM users WHERE name = ?")
        .bind(name)
        .first();

    if (!user) {
        return new Response("Unknown user", { status: 404 });
    }

    return Response.json(user);
}
