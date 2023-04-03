export interface Article {
  source: {
    id: null | string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  isSeleted: boolean;
  id: string;
}
export interface SearchContextValue {
  modalIsOpen: boolean;
  whichActive: number;
  data: any;
  handleSearchData: Function;
  setData: React.Dispatch<React.SetStateAction<any>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setWhichActive: React.Dispatch<React.SetStateAction<number>>;
  openModal: () => void;
  closeModal: () => void;
  addFovorite: React.Dispatch<React.SetStateAction<any>>;
}
