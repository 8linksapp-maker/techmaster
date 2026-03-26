import type { APIRoute } from 'astro';
import { readFileFromRepo, writeFileToRepo } from '../../plugins/_server';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { type, email, name, subject, message } = body;

        let leads: any[] = [];
        try {
            const raw = await readFileFromRepo('src/data/leads.json');
            leads = raw ? JSON.parse(raw) : [];
        } catch {
            leads = [];
        }

        const newLead = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            type, // 'newsletter' | 'contact'
            email,
            name,
            subject: subject || (type === 'newsletter' ? 'Inscrição Newsletter' : 'Sem Assunto'),
            message: message || ''
        };

        leads.unshift(newLead);

        await writeFileToRepo(
            'src/data/leads.json',
            JSON.stringify(leads, null, 2),
            { message: `Lead: new submission from ${email} (${type})` }
        );

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
