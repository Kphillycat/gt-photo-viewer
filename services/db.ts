import fetch from "node-fetch";

let PHOTOS = [];

const getPhotos = async () => {
  if (PHOTOS.length > 0) {
    console.log("photos retrieved from cache");
    return PHOTOS;
  }
  const res = await fetch("https://pastebin.com/raw/BmA8B0tY");
  const json = await res.text();
  // Some light data cleansing
  PHOTOS = json.split(/\n/).map((photo) => photo.replace(/\r/, ""));
  return PHOTOS;
};

module.exports = {
  getPhotos,
};
