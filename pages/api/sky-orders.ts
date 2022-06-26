// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { SkynetClient, genKeyPairFromSeed } from "skynet-js";

const client = new SkynetClient();
const { publicKey } = genKeyPairFromSeed(process.env.SKYNET_SEED || '');

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
      res.status(200).json({ message: 'Success', data: data, dataLink: dataLink });
    } catch (error) {
      res.status(400).json({ message: 'sadge', error: error });

    }
  } else if (req.method === "POST") {

    const json = { example: "This is some example JSON data." };

    res.status(200).json({ message: 'hello' });
  } else {
    res.status(400).json("Unable to handle request");
  }
}
