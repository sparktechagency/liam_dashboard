
export interface IQuestion {
  _id: string;
  question: string[];
  subCategoryId: {
    _id: string;
    name: string;
    img: string;
  };
};

export interface IQuestionDataSource {
  key: number;
  serial: number;
  _id: string;
  question: string[];
  subCategory: string;
  subCategoryId: string;
  img: string;
};
