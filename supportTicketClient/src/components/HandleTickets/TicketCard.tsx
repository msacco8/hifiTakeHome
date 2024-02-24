import { useState, ChangeEvent } from "react";
import { TicketProps, TicketStatus } from "../../types";
import "./HandleTickets.css";

const TicketCard: React.FC<TicketProps> = ({ numId, onUpdate, ticket: { _id, name, email, description, status } }) => {
  const [ticketResponse, setTicketResponse] = useState<string>("");
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [ticketStatus, setTicketStatus] = useState<TicketStatus>(status);

  // update the status of a ticket and make POST call to back end
  const handleStatusChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as TicketStatus;
    setTicketStatus(newStatus);
    onUpdate(_id, newStatus);
  };

  // hide or show description of a ticket
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // updates value of support ticket response
  const handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTicketResponse(e.target.value);
  };

  // handles a submitted response to a support ticket
  const handleSubmitResponse = () => {
    console.log(`Would send email here to ${email} with body: ${ticketResponse}`);
  };

  return (
    <div className="ticketCard">
      <h1>Ticket #{(numId + 1).toString()}</h1>
      <div className="cardInfo">
        <div className="senderInfo">
          <p>
            <b>Name</b>
          </p>
          <p className="infoField">{name}</p>
          <p>
            <b>Email Address</b>
          </p>
          <p className="infoField">{email}</p>
        </div>
        <div className="statusSelect">
          <p>
            <b>Status</b>
          </p>
          <select value={ticketStatus} onChange={handleStatusChange}>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>
      <div className="showDetails">
        <div onClick={toggleDetails}>{showDetails ? "▲ Hide" : "▼ Show"} Details</div>
        {showDetails && (
          <div className="ticketDetails">
            <p style={{ fontSize: "12px" }}>{description}</p>
            <textarea
              value={ticketResponse}
              onChange={handleResponseChange}
              placeholder="Write a response..."
            ></textarea>
            <button className="responseButton" onClick={handleSubmitResponse}>
              Submit Response
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketCard;
