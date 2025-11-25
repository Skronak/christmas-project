export const onRequestGet = async ({ request, env }) => {
    console.log('GET apu user');
    const stmt = env.DB.prepare('SELECT name FROM users');
    const result = await stmt.all()
    const rows = result.results || []
    return Response.json(results);
}

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        // Route : GET /api/users
        if (url.pathname === "/api/users" && request.method === "GET") {
            const {results} = await env.DB.prepare("SELECT * FROM users").all();
            return Response.json(results);
        }
    }
};