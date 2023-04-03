import express, { Application, json } from "express";
import {
  addProductsToMarket,
  listAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./logic";
import { verifyIdExist, verifyNameExist } from "./middlewares";

const app: Application = express();
const port: number = 3000;

app.use(json());

app.post("/products", verifyNameExist, addProductsToMarket);
app.get("/products", listAllProducts);
app.get("/products/:id", verifyIdExist, getProductById);
app.patch("/products/:id", verifyIdExist, verifyNameExist, updateProduct);
app.delete("/products/:id", verifyIdExist, deleteProduct);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
