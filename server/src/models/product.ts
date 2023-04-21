import * as mongodb from "mongodb";
 
export interface Product {
    name: string;
    price: number;
    description: string;
    size: "M" | "L" | "XL";
    _id?: mongodb.ObjectId;
}