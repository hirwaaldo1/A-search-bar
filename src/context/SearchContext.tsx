import { createContext, useEffect, useState, useCallback } from "react";
import { NEWS_DATA } from "../data/news";
import { SearchContextValue } from "../interfaces";
export const SearchContext = createContext<SearchContextValue>(
  {} as SearchContextValue
);
export default function SearchContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [whichActive, setWhichActive] = useState(0);
  const [data, setData] = useState(NEWS_DATA[0].articles.slice(0, 5));
  const [backData, setBackData] = useState(NEWS_DATA[0].articles);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setIsOpen((prevIsOpen) => !prevIsOpen);
      }
      if (modalIsOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setWhichActive((prevWhichActive) =>
            prevWhichActive === data.length - 1 ? 0 : prevWhichActive + 1
          );
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setWhichActive((prevWhichActive) =>
            prevWhichActive === 0 ? data.length - 1 : prevWhichActive - 1
          );
        }
        if (e.key === "Enter") {
          e.preventDefault();
          setWhichActive(0);
          setIsOpen(false);
        }
      }
    },
    [modalIsOpen, data.length]
  );
  function handleSearchData(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value === "") {
      setData(backData.slice(0, 5));
      return;
    }
    const newData = backData.filter((article) => {
      return (
        article.title.toLowerCase() || article.description.toLowerCase()
      ).includes(event.target.value.toLowerCase());
    });
    setData(newData.slice(0, 5));
  }
  function addFovorite(id: string) {
    const newData = data.map((article) => {
      if (id === article.id) {
        return {
          ...article,
          isSeleted: !article.isSeleted,
        };
      }
      return article;
    });
    setData(newData);
    setBackData((prevBackData) => {
      return prevBackData.map((article) => {
        if (id === article.id) {
          return {
            ...article,
            isSeleted: !article.isSeleted,
          };
        }
        return article;
      });
    });
  }
  useEffect(() => {
    const handleKeyDownRef = handleKeyDown;
    document.addEventListener("keydown", handleKeyDownRef);
    return () => {
      document.removeEventListener("keydown", handleKeyDownRef);
    };
  }, [handleKeyDown]);
  let value = {
    modalIsOpen,
    whichActive,
    data,
    setData,
    setIsOpen,
    setWhichActive,
    openModal,
    closeModal,
    handleSearchData,
    addFovorite,
  };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
