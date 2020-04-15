import fetch from "node-fetch";
import { ALL, WIDTH_INDEX } from "../lib/constants";

let PHOTOS = [];
let FILTERED_PHOTOS = {};

const getPhotosByWidth = (photos, width) => {
  if (FILTERED_PHOTOS[width]) {
    console.log("filtered photos from cache", width);
    return FILTERED_PHOTOS[width];
  }

  // Find and filter by width in the photo url
  FILTERED_PHOTOS[width] = photos.filter((photo) => {
    if (width === photo.match(/\w+/g)[WIDTH_INDEX]) return photo;
  });
  return FILTERED_PHOTOS[width];
};

const getFilteredPhotos = (photos, limit, start, width = ALL) => {
  if (width === ALL) {
    return photos.slice(start, limit);
  }
  return getPhotosByWidth(photos, width).slice(start, limit);
};

const getPhotos = async (limit, start, width = ALL) => {
  if (PHOTOS.length > 0) {
    console.log("photos retrieved from cache");
    return getFilteredPhotos(PHOTOS, limit, start, width);
  }
  const res = await fetch("https://pastebin.com/raw/BmA8B0tY");
  const json = await res.text();
  // Some light data cleansing
  PHOTOS = json.split(/\n/).map((photo) => photo.replace(/\r/, ""));
  return getFilteredPhotos(PHOTOS, limit, start, width);
};

module.exports = {
  getPhotos,
};
