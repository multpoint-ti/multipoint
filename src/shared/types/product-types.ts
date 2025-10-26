export type Product = {
  id: number;
  multpointCode: string;
  shortCode: string;
  automakerCode: string[];
  automakers: {
    id: string;
    name: string;
  }[];
  productLine: string;
  years: string[];
  vehiculesApplication: string[];
  images: {
    id: string;
    path: string;
  }[];
  details: string;
  createdAt: string;
  updatedAt: string;
  categories: string[];
}
