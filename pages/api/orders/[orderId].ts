// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('../../../creds.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

// This handler supports both GET and PUT requests.
// GET will return the order associated with the specified ID.
// PUT will attempt to update the order associated with the specified ID.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    // fetch specific order by firebase ID
    // e.g. Fp6DysftOikKClem31WJ
    // const { pid } = req.query;
    const ref = db.collection('orders').doc(req.query.orderId);
    const doc = await ref.get();

    if (!doc.exists) {
      res.status(404).json(`Order with ID ${req.query.orderId} not found`);
    }

    res.status(200).json(doc.data());

  } else if (req.method === 'PUT') {
    // update specific order
    // do some validation
    const object = {
      type: req.body.type,
      items: req.body.items
    };

    const doc = await db.collection('orders').doc(req.query.orderId).set(object);

    res.status(200).json(doc.id);

  } else {

    res.status(400).json('Unable to handle request');
  }
}
