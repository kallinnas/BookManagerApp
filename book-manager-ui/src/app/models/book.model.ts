export interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
    status: BookStatus;
}

export enum BookStatus {
    Available, OnHand, Reserved
}