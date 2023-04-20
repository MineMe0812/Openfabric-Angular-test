import { productRouter } from "./product.routes";

export const indexRouter = (app : any) => {
    app.use("/products", productRouter);
}
