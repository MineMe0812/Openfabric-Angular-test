import { productRouter } from "./product.routes";
import { authRouter } from "./auth.routes";
import { verifyToken } from "../middlewares/authJwt";

export const indexRouter = (app : any) => {
    app.use("/products", verifyToken, productRouter);
    app.use("/api/auth", authRouter);
}
