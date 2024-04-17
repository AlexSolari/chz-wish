import { CardData } from '$lib/types.js';
import { json } from '@sveltejs/kit';
import db from '$lib/db.js';

export async function GET({ url }) {
    const user = url.searchParams.get('user') || "";
    const items = await db.all(user);
    const viewModels = items.map(x => new CardData(x));

    return json(viewModels);
}
