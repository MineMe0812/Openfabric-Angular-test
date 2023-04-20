import * as mongodb from "mongodb";
 
export interface Product {
    name: string;
    position: string;
    level: "junior" | "mid" | "senior";
    _id?: mongodb.ObjectId;
}