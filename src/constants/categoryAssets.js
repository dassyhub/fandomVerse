export const CATEGORY_IMAGES = {
  anime: "/images/anime/AOT.jpeg",
  gaming: "/images/gaming/gtaa.jpeg",
  movies: "/images/movies/sinners.jpeg",
  tvshows: "/images/tvshows/marty.jpeg",
  kpop: "/images/k-pop/k-pop1.jpg",
  comics: "/images/comics/spiderman.jpg",
  manga: "/images/manga/MHA.jpg",
};

export const imageForCategory = (category) => CATEGORY_IMAGES[category] || "/images/content/anime-cover.svg";
