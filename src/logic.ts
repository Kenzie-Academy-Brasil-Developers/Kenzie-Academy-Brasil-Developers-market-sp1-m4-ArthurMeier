import express, { Request, Response } from "express";
import { market } from "./database";
import { ResponseData, IProduct, IFoodProduct } from "./interfaces";

function addProductsToMarket(req: Request, res: Response) {
  const products: (IProduct | IFoodProduct)[] = req.body;
  const newProducts: (IProduct | IFoodProduct)[] = [];

  products.forEach((product) => {
    const id = market.length + 1;
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 365);

    if ("calories" in product) {
      const newProduct: IFoodProduct = {
        id,
        name: product.name,
        price: product.price,
        weight: product.weight,
        calories: product.calories,
        section: product.section,
        expirationDate,
      };

      market.push(newProduct);
      newProducts.push(newProduct);
    } else {
      const newProduct: IProduct = {
        id,
        name: product.name,
        price: product.price,
        weight: product.weight,
        section: product.section,
        expirationDate,
      };

      market.push(newProduct);
      newProducts.push(newProduct);
    }
  });

  const total = market.reduce((acc, product) => acc + product.price, 0);

  const responseData: ResponseData = {
    total,
    marketProducts: newProducts,
  };

  return res.status(201).json(responseData);
}

function listAllProducts(req: Request, res: Response) {
  const total = market.reduce((acc, product) => acc + product.price, 0);
  const responseData: ResponseData = {
    total,
    marketProducts: market,
  };
  return res.json(responseData);
}

function getProductById(req: Request, res: Response) {
  const { id } = req.params;
  const product = market.find((p) => p.id === Number(id));

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  return res.json(product);
}

function updateProduct(req: Request, res: Response) {
  const id = Number(req.params.id);

  const productIndex = market.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  const productToUpdate = market[productIndex];

  const { name, price, weight, calories } = req.body;

  if (name) {
    productToUpdate.name = name;
  }

  if (price) {
    productToUpdate.price = price;
  }

  if (weight) {
    productToUpdate.weight = weight;
  }

  if (calories && (productToUpdate as IFoodProduct).calories !== undefined) {
    (productToUpdate as IFoodProduct).calories = calories;
  }

  return res.status(200).json(productToUpdate);
}

function deleteProduct(req: Request, res: Response) {
  const { id } = req.params;
  const index = market.findIndex((product) => product.id === +id);

  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  market.splice(index, 1);

  return res.sendStatus(204);
}

export {
  addProductsToMarket,
  listAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
