import { JSONFilePreset } from 'lowdb/node';
import type { Database, WishlistItem } from './types';

type DataCollection = Record<string, WishlistItem>;
const dbFilePath =
    import.meta.env.MODE == 'development' ? 'static/db.json' : `db.json`;

function connect() {
    return JSONFilePreset<DataCollection>(dbFilePath, {});
}

async function all() {
    const db = await connect();

    await db.read();

    return Object.values(db.data || []);
}

async function setBooked(itemName: string, secret: string) {
    const db = await connect();

    await db.update((data) => {
        data[itemName].isBooked = true;
        data[itemName].secret = secret;
    });

    return db.data[itemName];
}

async function setUnbooked(itemName: string, secret: string) {
    const db = await connect();

    if (db.data[itemName].secret == secret) {
        await db.update((data) => {
            data[itemName].isBooked = false;
            data[itemName].secret = null;
        });
    }

    return db.data[itemName];
}

export default {
    all,
    setBooked,
    setUnbooked
} as Database;
