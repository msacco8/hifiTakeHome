import mongoose from "mongoose";

enum TicketStatus {
  New = "New",
  InProgress = "In Progress",
  Resolved = "Resolved",
}

interface Ticket {
  name: String;
  email: String;
  description: String;
  status: TicketStatus;
}

const ticketSchema = new mongoose.Schema<Ticket>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: Object.values(TicketStatus), default: TicketStatus.New },
});

const TicketModel = mongoose.model<Ticket>("Ticket", ticketSchema);

export default TicketModel;
