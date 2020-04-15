import fetch from "node-fetch";
import { ALL, WIDTH_INDEX } from "../lib/constants";

let PHOTOS: Array<string> = [];
let FILTERED_PHOTOS: { [index: string]: Array<string> } = {};

const getPhotosByWidth = (photos: Array<string>, width: string) => {
  if (FILTERED_PHOTOS[width]) {
    console.log("filtered photos from cache", width);
    return FILTERED_PHOTOS[width];
  }

  // Find and filter by width in the photo url
  FILTERED_PHOTOS[width] = photos.filter((photo) => {
    let photoUrlParts = photo.match(/\w+/g);
    if (photoUrlParts && width === photoUrlParts[WIDTH_INDEX]) return photo;
  });
  return FILTERED_PHOTOS[width];
};

const getFilteredPhotos = (
  photos: Array<string>,
  limit: number,
  start: number,
  width = ALL
) => {
  if (width === ALL) {
    return photos.slice(start, limit);
  }
  return getPhotosByWidth(photos, width).slice(start, limit);
};

const getPhotos = async (limit: number, start: number, width = ALL) => {
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
