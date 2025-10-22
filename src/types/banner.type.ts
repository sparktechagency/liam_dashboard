export type IBanner = {
  _id: string;
  image: string;
  category: {
    _id: string;
    name: string;
  },
  subCategory: {
    _id: string;
    name: string;
  },
  type: "top" | "bottom";
};

export type IBannerDataSource = {
  key: number;
  serial: number;
  _id: string;
  image: string;
  category: string;
  categoryId: string;
  subCategory: string;
  subCategoryId: string;
  type: "top" | "bottom";
};
