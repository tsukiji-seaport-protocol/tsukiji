// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const { SkynetClient, genKeyPairFromSeed } = require("@skynetlabs/skynet-nodejs");

const client = new SkynetClient("", { skynetApiKey: process.env.SKYNET_API_KEY });
const { publicKey, privateKey } = genKeyPairFromSeed(process.env.SKYNET_SEED || '');

// This handler supports both GET and POST requests.
// GET will return all orders.
// POST will attempt to create a new order and return the resulting ID.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const dataKey = "orders";
  if (req.method === "GET") {
    try {
      const { data, dataLink } = await client.db.getJSON(publicKey, dataKey);
      res.status(200).json({ data: data, dataLink: dataLink });
    } catch (error) {
      res.status(400).json({ message: 'sadge', error: error });
    }
  } else if (req.method === "POST") {
    try {
      await client.db.setJSON(privateKey, dataKey, req.body);
      res.status(200).json({ message: 'success!' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'sadge', error: error, attempt: req.body });
    }
  } else {
    res.status(400).json("Unable to handle request");
  }
}
