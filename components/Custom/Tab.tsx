"use client";
import Image, { type StaticImageData } from "next/image";
import { useSnapshot } from "valtio";
import state from "@/store";

const Tab = ({ tab, handleClick, isActiveTab, isFilterTab }: TapProps) => {
  const snap = useSnapshot(state);
  const activeStyles =
    isFilterTab && isActiveTab
      ? { backgroundColor: snap.color, opacity: 0.5 }
      : { backgroundColor: "transparent", opacity: 1 };

  return (
    <div
      key={tab.name}
      className={`tab-btn ${
        isFilterTab ? "rounded-full glassMorphism" : "rounded-4"
      } `}
      style={activeStyles}
      onClick={handleClick}
    >
      <Image
        src={tab.icon}
        alt={tab.name}
        width={24}
        height={24}
        className={`${
          isFilterTab ? "w-2/3 h-2/3" : "w-11/12 h-11/12 objext-contain"
        }`}
      />
    </div>
  );
};

type TapProps = {
  tab: {
    name: string;
    icon: StaticImageData;
  };
  handleClick: () => void;
  isActiveTab?: string;
  isFilterTab?: boolean;
};

export default Tab;
