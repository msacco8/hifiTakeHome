import type { VercelRequest, VercelResponse } from "@vercel/node";
import TicketModel from "../models/ticket";
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
      // Connect to database   
      const { db } = await mongoConnection();

      // Deconstruct request body and create ticket
      const { body } = req;
      const newTicket = new TicketModel({ ...JSON.parse(body) });

      // Insert ticket into database   
      const response = await db.collection("supportTickets").insertOne(newTicket);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error creating ticket:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).end();
};
