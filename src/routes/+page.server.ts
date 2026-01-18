import db from '$lib/db';
import { CardData } from '$lib/types';

export async function load() {
    const items = await db.all();
    const viewModels = items.map((x) => new CardData(x).toJSON());

    return { viewModels };
}
