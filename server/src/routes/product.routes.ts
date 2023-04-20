import * as express from "express";
import * as product from "../controllers/product.controller";

export const productRouter = express.Router();
productRouter.use(express.json());

productRouter.get("/", product.getAll);
productRouter.get("/:id", product.getById);
productRouter.post("/", product.create);
productRouter.put("/:id", product.update);
productRouter.delete("/:id", product.remove);
