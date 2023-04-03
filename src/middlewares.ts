import { NextFunction, Request, Response } from "express";
import { market } from "./database";

const verifyNameExist = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  const product = market.find((p) => p.name === name);
  if (!!product) {
    return res.status(409).json({ error: "Product name already exists" });
  }
  next();
};

const verifyIdExist = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const product = market.find((p) => p.id == Number(id));

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  next();
};

export { verifyIdExist, verifyNameExist };
