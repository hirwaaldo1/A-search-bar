import { FiSearch } from "react-icons/fi";
import Model from "./Model";
import { useState, useEffect } from "react";
function App() {
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

  return (
    <div className="max-w-5xl mx-auto mt-5">
      <div
        onClick={openModal}
        className="flex justify-between bg-[#333a45] py-2 px-5 rounded-full text-[#99a1b3] cursor-pointer 
      border-[3px] border-transparent active:border-[#149eca]"
      >
        <div className="flex items-center gap-3">
          <FiSearch />
          <span className="-mt-0.5">Search</span>
        </div>
        <div className="flex gap-2">
          <span className="bg-[#23272f] text-[10px] flex font-semibold py-1 px-2 rounded-md">
            Ctrl
          </span>
          <span className="bg-[#23272f] text-[10px] flex font-semibold items-center py-1 px-2 rounded-md">
            K
          </span>
        </div>
      </div>

      <Model
        isOpen={modalIsOpen}
        whichActive={whichActive}
        handleClose={closeModal}
        setWhichActive={setWhichActive}
      />
    </div>
  );
}

export default App;
