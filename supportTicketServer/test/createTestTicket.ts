type TicketStatus = "New" | "In Progress" | "Resolved";

interface TicketData {
  name: string;
  email: string;
  description: string;
  status: TicketStatus;
}

async function createTestTicket(): Promise<void> {
  const url: string = "http://localhost:3000/api/createTicket";
  const ticketData: TicketData = {
    name: "Test User",
    email: "test@example.com",
    description: "Test issue description...",
    status: "New",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Ticket created successfully:", data);
  } catch (error) {
    console.error("Error creating ticket:", error);
  }
}

async function testUpdateTicket(): Promise<void> {
  const url: string = "http://localhost:3000/api/updateStatus";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: "65da214b0983bd79ac3b3af9", status: "In Progress" }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Ticket updated successfully:", data);
  } catch (error) {
    console.error("Error updating ticket:", error);
  }
}

testUpdateTicket();
createTestTicket();
