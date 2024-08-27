"use client";
import state from "@/store";
import { useSnapshot } from "valtio";
import { getContrastingColor } from "@/config/helpers";

const CustomBtn = ({
  title,
  type,
  customStyles,
  handleClick,
}: CustomBtnProps) => {
  const snap = useSnapshot(state);

  const generateStyle = (type: string) => {
    if (type === "filled") {
      return {
        background: snap.color,
        color: getContrastingColor(snap.color),
      };
    } else if (type === "outline") {
      return {
        color: snap.color,
        border: `1px solid ${snap.color}`,
      };
    }
  };

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

type CustomBtnProps = {
  title: string;
  type: "filled" | "outline" | "custom";
  customStyles?: string;
  handleClick?: () => void;
};

export default CustomBtn;
