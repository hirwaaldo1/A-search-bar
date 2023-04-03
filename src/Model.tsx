import Modal from "react-modal";
import styles from "./config/ModelStyle";
import { NEWS_DATA } from "./data/news";
import { FiCornerDownLeft, FiMenu, FiSearch, FiStar } from "react-icons/fi";
import ModelFooter from "./ModelFooter";
import { useContext, useState } from "react";
import { SearchContext, SearchContextValue } from "./context/SearchContext";
Modal.setAppElement("#root");
export default function Model(): JSX.Element {
  const { modalIsOpen, closeModal, setWhichActive, whichActive } =
    useContext<SearchContextValue>(SearchContext);
  const [data, setData] = useState(NEWS_DATA[0].articles.slice(0, 5));
  function handleSearchData(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value === "") {
      setData(NEWS_DATA[0].articles.slice(0, 5));
      return;
    }
    const newData = NEWS_DATA[0].articles.filter((article) => {
      return (
        article.title.toLowerCase() || article.description.toLowerCase()
      ).includes(event.target.value.toLowerCase());
    });
    setData(newData.slice(0, 5));
  }
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
              onChange={handleSearchData}
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
                {data.map((article, index) => {
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
                              console.log("aldo");
                              e.stopPropagation();
                            }}
                            className="mt-0.5 active:fill-yellow-400 active:stroke-yellow-400"
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
        <div>
          <h3 className="uppercase text-sm font-bold my-3">FAVORITES</h3>
          <div className="flex justify-between items-center text-[#99a1b3] cursor-pointer rounded-md px-6">
            <div className="flex gap-2 items-center py-1.5">
              <FiMenu size={20} className="mt-1" />
              <div className=" text-sm leading-5">
                <span>san Diego, CA - san Diego JS US</span>
                <span className="block">1,000 members</span>
              </div>
            </div>
            <FiStar className="mt-0.5 active:fill-yellow-400 active:stroke-yellow-400" />
          </div>
        </div>

        <ModelFooter />
      </div>
    </Modal>
  );
}
