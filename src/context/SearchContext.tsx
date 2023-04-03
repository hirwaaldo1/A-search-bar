import { createContext, useEffect, useState } from "react";
export interface SearchContextValue {
  modalIsOpen: boolean;
  whichActive: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setWhichActive: React.Dispatch<React.SetStateAction<number>>;
  openModal: () => void;
  closeModal: () => void;
}
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
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "k") {
      e.preventDefault();
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }
    if (modalIsOpen) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setWhichActive((prevWhichActive) =>
          prevWhichActive === 4 ? 0 : prevWhichActive + 1
        );
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setWhichActive((prevWhichActive) =>
          prevWhichActive === 0 ? 4 : prevWhichActive - 1
        );
      }
      if (e.key === "Enter") {
        e.preventDefault();
        setWhichActive(0);
        setIsOpen(false);
      }
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalIsOpen]);
  let value = {
    modalIsOpen,
    whichActive,
    setIsOpen,
    setWhichActive,
    openModal,
    closeModal,
  };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
