import db from '$lib/db';
import { CardData } from '$lib/types';

export async function load({ cookies }) {
    const user = cookies.get('target') as string;
    const items = await db.all(user);
    const viewModels = items.map((x) => new CardData(x).toJSON());

    return { viewModels };
}
