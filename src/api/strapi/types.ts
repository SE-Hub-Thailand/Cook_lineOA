// src/api/strapi/types.ts

import { N } from "vitest/dist/chunks/reporters.C_zwCd4j.js";

export interface User {
    id: number;
    username: string;
    email: string;
    fullName: number;
    gender: number;
    address: string;
    cardIDv: string;
    telNumber: string;
    point: Number;  // Assuming this is the ID of the uploaded image
}

export interface Shop {
    id: number;
    name: string;
    location: string;
    latitude: number;
    longitude: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    bookBankNumber: string | null;
    image: number;  // Assuming this is the ID of the uploaded image
    bookBankImage: number;  // Assuming this is the ID of the uploaded image
    bankName: string;  // Bank relationship
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    approved: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    shop: {
        id: number;
        name: string;
        location: string;
        latitude: number;
        longitude: number;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
}

export interface RecycleMachine {
    id: number;
    location: string;
    latitude: string;
    longitude: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface OilMachine {
    id: number;
    location: string;
    latitude: string;
    longitude: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}
