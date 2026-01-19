import { command, query } from '$app/server';
import db from '$lib/db';

export const getWishlistItems = query(async () => {
    const items = await db.all();

    return items.map((x) => ({ ...x }));
});

export const book = command(
    'unchecked',
    async (data: { name: string; secret: string }) =>
        await db.setBooked(data.name, data.secret)
);

export const unbook = command(
    'unchecked',
    async (data: { name: string; secret: string }) =>
        await db.setUnbooked(data.name, data.secret)
);
