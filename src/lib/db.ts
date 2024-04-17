
import { JSONFilePreset } from 'lowdb/node'
import type { Database, IWishlistItem } from './types';
import type { Low } from 'lowdb';

type UserDataCollection = Record<string, IWishlistItem>;
type DataCollection = Record<string, UserDataCollection>;

function connect() : Promise<Low<DataCollection>> {
    return JSONFilePreset(`db.json`, {});
}

async function all(user: string): Promise<IWishlistItem[]> {
    const db = await connect();

    await db.read();

    return Object.values(db.data[user] || []);
}

async function setBooked(user: string, itemName: string, secret: string): Promise<IWishlistItem> {
    const db = await connect();

    await db.update((data) => {
        data[user][itemName].isBooked = true;
        data[user][itemName].secret = secret;
    });

    return db.data[user][itemName];
}

async function setUnbooked(user: string, itemName: string, secret: string): Promise<IWishlistItem> {
    const db = await connect();

    if (db.data[user][itemName].secret == secret) {
        await db.update((data) => {
            data[user][itemName].isBooked = false;
            data[user][itemName].secret = null;
        });
    }

    return db.data[user][itemName];
}

export default {
    all,
    setBooked,
    setUnbooked
} as Database;