import { proxy } from "valtio";
interface State {
  intro: boolean;
  color: string;
  isLogoTexture: boolean;
  isFullTexture: boolean;
  logoDecal: string;
  fullDecal: string;
  [key: string]: any;
}

const state: State = proxy({
  intro: true,
  color: "#000000",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "/logo_1.png",
  fullDecal: "/logo_1.png",
});

export default state;
