// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const { SkynetClient, genKeyPairFromSeed } = require("@skynetlabs/skynet-nodejs");

const client = new SkynetClient();
const { publicKey, privateKey } = genKeyPairFromSeed(process.env.SKYNET_SEED || '');

// This handler supports both GET and PUT requests.
// GET will return the order associated with the specified ID.
// PUT will attempt to update the order associated with the specified ID.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const dataKey = "orders";

  if (req.method === 'GET') {
    try {
      const { data } = await client.db.getJSON(publicKey, dataKey);
      data.map((entry: any) => {
        if (entry.contains(req.query.orderId)) {
          return entry;
        }
      })
      if (data.length < 1) {
        res.status(404).json(`Order with ID ${req.query.orderId} not found`);
        return;
      };
      res.status(200).json({ data: data });
    } catch (error) {
      res.status(400).json({ message: 'sadge', error: error });
    }
  } else if (req.method === 'PUT') {
    // update specific order
    // TODO: make work with skynet
    res.status(400).json('Unable to handle request');
  } else {

    res.status(400).json('Unable to handle request');
  }
}
