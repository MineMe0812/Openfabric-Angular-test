import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./config/database";
import { indexRouter } from "./routes/index";
 
// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();
 
const { ATLAS_URI, SERVER_URL, PROT } = process.env;
 
if (!ATLAS_URI) {
   console.error("No ATLAS_URI environment variable has been defined in config.env");
   process.exit(1);
}
 
connectToDatabase(ATLAS_URI)
   .then(() => {
       const app = express();
       app.use(cors());
       
       // define all router
       indexRouter(app);
       
       // start the Express server
       app.listen(PROT, () => {
           console.log(`Server running at ${SERVER_URL}:${PROT}...`);
       });
 
   })
   .catch(error => console.error(error));