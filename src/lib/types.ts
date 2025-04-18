export interface ICardData {
    name: string;
    description: string;
    image: string;
    link: string;
    isBooked: boolean;
    isUnlimited: boolean;
}

export enum User {
    chz = 'chz',
    nedovolnaya = 'nedovolnaya'
}

export interface IWishlistItem {
    name: string;
    description: string;
    image: string;
    link: string;
    secret: string | null;
    isBooked: boolean;
    isUnlimited: boolean;
}

export class CardData implements ICardData {
    name: string;
    description: string;
    image: string;
    link: string;
    isBooked: boolean;
    isUnlimited: boolean;

    constructor(data: IWishlistItem) {
        this.name = data.name;
        this.description = data.description;
        this.image = data.image;
        this.link = data.link || '';
        this.isBooked = data.isBooked;
        this.isUnlimited = data.isUnlimited;
    }

    toJSON() {
        return { ...this };
    }
}

export interface IBookingStatusChangeRequestData {
    secret: string;
    name: string;
}

export interface IPostRequestData<TType> {
    user: User;
    data: TType;
}

export interface Database {
    all(user: string): Promise<IWishlistItem[]>;
    setBooked(
        user: string,
        itemName: string,
        secret: string
    ): Promise<IWishlistItem>;
    setUnbooked(
        user: string,
        itemName: string,
        secret: string
    ): Promise<IWishlistItem>;
}
