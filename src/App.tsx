import { FiSearch } from "react-icons/fi";
import Model from "./Model";
import { useContext } from "react";
import { SearchContext } from "./context/SearchContext";
import { SearchContextValue } from "./interfaces";
function App() {
  const { openModal } = useContext<SearchContextValue>(SearchContext);
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

      <Model />
    </div>
  );
}

export default App;
