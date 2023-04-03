import { FiArrowDown, FiArrowUp, FiCornerDownLeft } from "react-icons/fi";

export default function ModelFooter() {
  return (
    <div className="absolute bottom-0 w-full text-[#99a1b3] text-xs">
      <div className="flex justify-between ">
        <div className="flex items-center gap-2.5">
          <FiCornerDownLeft
            size={20}
            className="bg-[#e7eaee] text-black p-[3px] rounded-sm"
          />
          <span>to select</span>
        </div>
        <div className="flex gap-2 items-center">
          <FiArrowDown
            size={20}
            className="bg-[#e7eaee] text-black p-[3px] rounded-sm"
          />
          <FiArrowUp
            size={20}
            className="bg-[#e7eaee] text-black p-[3px] rounded-sm"
          />
          <span>to navigate</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="bg-[#e7eaee] text-black px-[3px] pt-[3px] pb-[4px] rounded-sm font-semibold">
            esc
          </span>
          <span>to close</span>
        </div>
      </div>
    </div>
  );
}
