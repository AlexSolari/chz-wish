import { JSONFilePreset } from 'lowdb/node';
import type { Database, IWishlistItem } from './types';

type UserDataCollection = Record<string, IWishlistItem>;
type DataCollection = Record<string, UserDataCollection>;

function connect() {
    return JSONFilePreset(
        import.meta.env.MODE == 'development' ? 'static/db.json' : `db.json`,
        {} as DataCollection
    );
}

async function all(user: string) {
    const db = await connect();

    await db.read();

    return Object.values(db.data[user] || []);
}

async function setBooked(user: string, itemName: string, secret: string) {
    const db = await connect();

    await db.update((data) => {
        data[user][itemName].isBooked = true;
        data[user][itemName].secret = secret;
    });

    return db.data[user][itemName];
}

async function setUnbooked(user: string, itemName: string, secret: string) {
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
