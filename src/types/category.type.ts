


export type ICategory = {
    _id: string;
    name: string;
    img: string;
}

export type ICategoryDataSource = {
    key: number;
    serial: number;
    _id: string;
    name: string;
    img: string;
}


export type ISubCategory = {
    _id: string;
    name: string;
    img: string;
    categoryId: {
      _id: string
      name: string
    }
}

export type ISubCategoryDataSource = {
    key: number;
    serial: number;
    _id: string;
    name: string;
    img: string;
    category: string;
    categoryId: string;
}