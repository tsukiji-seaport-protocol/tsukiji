// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const { Web3Storage, Blob, File } = require('web3.storage')

const {
  initializeApp,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
} = require("firebase-admin/firestore");
const admin = require('firebase-admin');

if (process.env.FIREBASE_PRIVATE_KEY && admin.apps.length === 0) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })
  });
}

const token: string = process.env.FILECOIN_API_KEY || '';
const storage = new Web3Storage({ token });

const db = getFirestore();

// This handler supports both GET and POST requests.
// GET will return all orders.
// POST will attempt to create a new order and return the resulting ID.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    try {
      const doc = await db.collection('utils').doc("filecoin").get();
      const { cid } = doc.data();
      if (!cid) {
        res.status(400).json({ message: 'sadge couldn\'t retrieve CID' });
        return;
      }
      const data = await storage.get(cid);
      const files = await data.files(); // Web3File[]

      res.status(200).json({ cid: cid, data: files, file: `https://gateway.pinata.cloud/ipfs/${cid}/orders.json` });
    } catch (error) {
      res.status(400).json({ message: 'sadge', error: error });
    }
  } else if (req.method === "POST") {
    try {
      const blob = new Blob([JSON.stringify(req.body)], { type: 'application/json' })
      const orders = [new File([blob], 'orders.json')];
      const cid = await storage.put(orders)
      // store cid in firestore
      await db.collection('utils').doc("filecoin").set({ cid });
      res.status(200).json({ message: 'success!', cid: cid });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'sadge', error: error, attempt: req.body });
    }
  } else {
    res.status(400).json("Unable to handle request");
  }
}
