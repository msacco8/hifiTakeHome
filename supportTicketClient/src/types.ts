export type TicketStatus = "New" | "In Progress" | "Resolved";

export type Ticket = {
  _id: string;
  name: string;
  email: string;
  description: string;
  status: TicketStatus;
};

export type FormState = {
  name: string;
  email: string;
  description: string;
};

export type TicketProps = {
  numId: number;
  ticket: Ticket;
  onUpdate: (id: string, newStatus: TicketStatus) => void;
};
