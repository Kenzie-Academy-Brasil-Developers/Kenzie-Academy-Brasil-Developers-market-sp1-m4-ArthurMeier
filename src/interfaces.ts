interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: "food" | "cleaning";
  expirationDate: Date;
}

interface ICleaningProduct extends IProduct {}

interface IFoodProduct extends IProduct {
  calories: number;
}

interface ResponseData {
  total: number;
  marketProducts: IProduct[];
}

export { ICleaningProduct, IFoodProduct, IProduct, ResponseData };
