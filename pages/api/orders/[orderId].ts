// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const admin = require("firebase-admin");

if (process.env.FIREBASE_PRIVATE_KEY && admin.apps.length === 0) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}
const db = getFirestore();

// This handler supports both GET and PUT requests.
// GET will return the order associated with the specified ID.
// PUT will attempt to update the order associated with the specified ID.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    // fetch specific order by firebase ID
    // e.g. Fp6DysftOikKClem31WJ
    // const { pid } = req.query;
    const ref = db.collection("orders").doc(req.query.orderId);
    const doc = await ref.get();

    if (!doc.exists) {
      res.status(404).json(`Order with ID ${req.query.orderId} not found`);
    }

    res.status(200).json(doc.data());
  } else if (req.method === "PUT") {
    // update specific order
    // TODO: do some validation
    const doc = await db
      .collection("orders")
      .doc(req.query.orderId)
      .set(req.body);

    res.status(200).json(doc.id);
  } else {
    res.status(400).json("Unable to handle request");
  }
}
