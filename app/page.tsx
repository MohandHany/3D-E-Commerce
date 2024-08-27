import { CanvasComp, CustomizerComp, HomeComp } from "@/components";

const HomePage = () => {
  return (
    <main className="app transition-all ease-in">
      <HomeComp />
      <CanvasComp />
      <CustomizerComp />
    </main>
  );
};

export default HomePage;
