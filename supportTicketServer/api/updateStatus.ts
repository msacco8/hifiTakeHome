import { VercelRequest, VercelResponse } from "@vercel/node";
import { ObjectId } from "mongodb";
import mongoConnection from "../lib/mongoSetup";

export default async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Ensure pre-flight request passes
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    try {
      // Connect to database and attempt to update ticket status   
      const { db } = await mongoConnection();
      const { id, status } = JSON.parse(req.body);
      const objectId = ObjectId.createFromHexString(id);
      const response = await db.collection("supportTickets").updateOne({ _id: objectId }, { $set: { status: status } });

      // Return error if nothing is modified
      if (response.modifiedCount === 0) {
        return res.status(404).send("Ticket Not Found or No Change Made");
      }
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error updating ticket status:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // If not OPTIONS or POST, return method not allowed
  return res.status(405).end();
};
