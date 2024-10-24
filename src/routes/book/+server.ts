import db from '$lib/db';
import {
    CardData,
    type IBookingStatusChangeRequestData,
    type IPostRequestData
} from '$lib/types.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const requestBody =
        (await request.json()) as IPostRequestData<IBookingStatusChangeRequestData>;
    const response = await db.setBooked(
        requestBody.user,
        requestBody.data.name,
        requestBody.data.secret
    );

    return json(new CardData(response));
}
