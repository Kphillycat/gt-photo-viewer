import { NextApiRequest, NextApiResponse } from "next";
// const photos = import("./gt-photos.csv");
const { getPhotos } = require("../../services/db");

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ photos: await getPhotos() });
};
