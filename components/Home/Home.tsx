"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "@/config/motion";
import state from "@/store";
import Image from "next/image";
import CustomBtn from "../CustomBtn";

const HomeComp = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")}>
            <Image
              src="/logo_2.png"
              alt="logo"
              width={200}
              height={200}
              className="w-16 h-16 object-contain"
            />
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LET&apos;S <br className="xl:block hidden" /> DO IT.
              </h1>
            </motion.div>

            <motion.div
              className="flex flex-col gap-5"
              {...headContentAnimation}
            >
              <p className="max-w-md font-normal text-gray-600 text-base">
                Create your unique and exclusive shirt with our brand-new 3D
                customization tool. <strong>Unleash your imagination</strong>{" "}
                and define your own style.
              </p>

              <CustomBtn
                title="Customize It"
                type="filled"
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                handleClick={() => (state.intro = false)}
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default HomeComp;
