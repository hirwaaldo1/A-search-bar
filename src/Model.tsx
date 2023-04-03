import Modal from "react-modal";
import styles from "./config/ModelStyle";
import { NEWS_DATA } from "./data/news";
import { FiCornerDownLeft, FiMenu, FiSearch, FiStar } from "react-icons/fi";
import ModelFooter from "./ModelFooter";
import { useContext } from "react";
import { SearchContext } from "./context/SearchContext";
import { Article, SearchContextValue } from "./interfaces";
Modal.setAppElement("#root");
export default function Model(): JSX.Element {
  const {
    modalIsOpen,
    closeModal,
    setWhichActive,
    addFovorite,
    data,
    handleSearchData,
    whichActive,
  } = useContext<SearchContextValue>(SearchContext);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={styles}
      contentLabel="Seacher Modal"
    >
      <div className="text-white h-full relative">
        <div className="flex justify-between bg-[#333a45] py-3 px-5 mb-5 rounded-full text-[#99a1b3] cursor-pointer ">
          <div className="flex items-center w-full gap-3">
            <FiSearch />
            <input
              placeholder="Search"
              autoFocus
              onChange={(event) => handleSearchData(event)}
              className="-mt-0.5 bg-transparent outline-none w-full"
            />
          </div>
        </div>
        <div>
          {data.length === 0 ? (
            <p className="flex justify-center text-lg">Not data 💔</p>
          ) : (
            <>
              <h3 className="uppercase text-sm font-bold my-3">
                REACT MEETUPS
              </h3>
              <div className="overflow-auto h-[300px]">
                {data.map((article: Article, index: number) => {
                  return (
                    <div
                      key={`key-new-${index}`}
                      onClick={closeModal}
                      onMouseEnter={() => setWhichActive(index)}
                      className={`flex justify-between items-center group text-[#99a1b3] cursor-pointer 
                  rounded-md px-6 mb-2 ${
                    whichActive === index && "bg-[#149eca] text-white"
                  }
                  `}
                    >
                      <div className="flex gap-2 items-center py-1.5 ">
                        <FiMenu size={20} className="mt-1" />
                        <div className="text-sm leading-5">
                          <span>{article.title.substring(0, 100)}...</span>
                          <span className="block text-white font-semibold">
                            {article.source.name}
                          </span>
                        </div>
                      </div>
                      {whichActive === index && (
                        <div className="flex gap-2 items-center">
                          <FiStar
                            onClick={(e) => {
                              addFovorite(article.id);
                              e.stopPropagation();
                            }}
                            className={`mt-0.5 ${
                              article.isSeleted &&
                              "fill-yellow-400 stroke-yellow-400"
                            } `}
                          />
                          <FiCornerDownLeft className="mt-0.5" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
        <div className="h-[170px] overflow-auto">
          {data.filter((value: Article) => value.isSeleted).length > 0 && (
            <h3 className="uppercase text-sm font-bold my-3">FAVORITES</h3>
          )}
          {data
            .filter((value: Article) => {
              return value.isSeleted;
            })
            .map((article: Article) => {
              return (
                <div
                  key={article.id}
                  onClick={closeModal}
                  className="flex justify-between items-center text-[#99a1b3] cursor-pointer rounded-md px-6 hover:bg-[#149eca] hover:text-white"
                >
                  <div className="flex gap-2 items-center py-1.5">
                    <FiMenu size={20} className="mt-1" />
                    <div className=" text-sm leading-5">
                      <span>{article.title.substring(0, 100)}...</span>
                      <span className="block">{article.source.name}</span>
                    </div>
                  </div>
                  <FiStar
                    onClick={(e) => {
                      addFovorite(article.id);
                      e.stopPropagation();
                    }}
                    className={`mt-0.5 ${
                      article.isSeleted && "fill-yellow-400 stroke-yellow-400"
                    } `}
                  />
                </div>
              );
            })}
        </div>

        <ModelFooter />
      </div>
    </Modal>
  );
}
