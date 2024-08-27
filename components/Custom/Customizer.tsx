"use client";
import { motion, AnimatePresence } from "framer-motion";
import { fadeAnimation, slideAnimation } from "@/config/motion";
import { useSnapshot } from "valtio";
import { useState } from "react";
import { reader } from "@/config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "@/config/constants";
import { ColorPicker, CustomBtn, FilePicker, Tab } from "@/components";
import state from "@/store";

const CustomizerComp = () => {
  const [file, setFile] = useState<File | null>(null);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });
  const snap = useSnapshot(state);

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      default:
        return null;
    }
  };

  const handleActiveFilterTab = (tabName: string) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName as keyof typeof prevState],
      };
    });
  };

  const handleDecals = (type: string, result: string) => {
    const decalType = DecalTypes[type as keyof typeof DecalTypes];
    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab as keyof typeof activeFilterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const readFile = (type: string) => {
    if (!file) return;
    reader(file).then((result) => {
      handleDecals(type, result as string);
      setActiveEditorTab("");
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            {...slideAnimation("left")}
            className="absolute top-0 left-0 z-10"
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => {
                      setActiveEditorTab(tab.name);
                    }}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-5 right-5 z-10"
            {...fadeAnimation}
          >
            <CustomBtn
              title="Go Back"
              type="filled"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className="filtertabs-container tabs"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                handleClick={() => handleActiveFilterTab(tab.name)}
                isActiveTab={
                  activeFilterTab[tab.name as keyof typeof activeFilterTab]
                    ? "active"
                    : "inactive"
                }
                isFilterTab
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CustomizerComp;
