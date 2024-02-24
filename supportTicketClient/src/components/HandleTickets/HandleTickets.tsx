import { useState, useEffect } from "react";
import TicketCard from "./TicketCard";
import { Ticket, TicketStatus } from "../../types";
import "./HandleTickets.css";

const HandleTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Get status and ID from child card and send request to backend to update status
  const updateTicketStatus = async (id: string, newStatus: TicketStatus) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/updateStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      await response.json();
      setTickets(tickets.map((ticket: Ticket) => (ticket._id === id ? { ...ticket, status: newStatus } : ticket)));
    } catch (error) {
      console.error("Failed to update ticket:", error);
    }
  };

  // Fetch all tickets, called upon loading of route
  const fetchTickets = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/getTickets`);
      console.log(response)
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const contentType = response.headers.get('Content-Type');
      if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError("Response is not JSON");
      }
      console.log("before ticketData")
      console.log(response.body)
      const ticketData = await response.json();
      console.log("after ticketData")
    //   console.log(response.body!.json())
    //   console.log(ticketData)
      setTickets(ticketData);
      console.log("got here")
    } catch (error) {
      console.error("Failed to fetch ticket data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  if (!loading && tickets.length > 0) {
    return (
      <div className="ticketsContainer">
        {tickets.map((ticket: Ticket, index: number) => (
          <TicketCard
            key={`ticketCard-${index.toString()}`}
            numId={index}
            ticket={ticket}
            onUpdate={updateTicketStatus}
          />
        ))}
      </div>
    );
  } else if (loading) {
    return <h1>Loading</h1>;
  } else {
    return <h1>No active support tickets</h1>;
  }
};

export default HandleTickets;
