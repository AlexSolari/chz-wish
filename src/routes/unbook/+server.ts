import db from "$lib/db";
import { CardData, type IBookingStatusChangeRequestData, type IPostRequestData } from "$lib/types";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    const requestBody = await request.json() as IPostRequestData<IBookingStatusChangeRequestData>;
    const response = await db.setUnbooked(
        requestBody.user,
        requestBody.data.name,
        requestBody.data.secret
    );

    return json(new CardData(response));
}
