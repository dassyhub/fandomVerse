import { FiFilm, FiTv, FiMic, FiBookOpen } from "react-icons/fi";
import { TbMask, TbDeviceGamepad2, TbBubbleText } from "react-icons/tb";

export const CATEGORY_ICONS = {
  anime: { icon: TbMask, color: "#ff3e9e" },
  gaming: { icon: TbDeviceGamepad2, color: "#34e4ea" },
  movies: { icon: FiFilm, color: "#f97316" },
  tvshows: { icon: FiTv, color: "#facc15" },
  kpop: { icon: FiMic, color: "#ec4899" },
  comics: { icon: TbBubbleText, color: "#22c55e" },
  manga: { icon: FiBookOpen, color: "#9b5cff" },
};