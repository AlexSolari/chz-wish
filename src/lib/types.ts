export type WishlistItem = {
    name: string;
    description: string;
    image: string;
    link: string;
    secret?: string | null;
    isBooked: boolean;
    isUnlimited: boolean;
};

export type CardData = Omit<WishlistItem, 'secret'>;

export interface Database {
    all(): Promise<WishlistItem[]>;
    setBooked(itemName: string, secret: string): Promise<WishlistItem>;
    setUnbooked(itemName: string, secret: string): Promise<WishlistItem>;
}
