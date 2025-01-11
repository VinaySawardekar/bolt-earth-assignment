import { Request, Response } from "express";
import { statusCode } from "../../config/constants";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../../utility/customResponse";
import Event from "../event/model";
import Ticket from "../ticket/model";
import {
  CreateEventRequestBody,
  PurchaseTicketRequestBody,
} from "../../types/event";
import { ObjectId } from "mongoose";
import { EidRequest } from "../../types/transformRequest";

/**
 * Retrieves a report of all events with the number of tickets sold for each event.
 *
 * @param {Request} req - The request object containing information about the HTTP request.
 * @param {Response} res - The response object used to send the HTTP response.
 * @returns { { status: string; message: string; data: Array<any> | null } } - The HTTP response with the success or error message.
 */
const getReports = async (req: Request, res: Response) => {
  /**
   * #swagger.tags = ["Report"]
   * #swagger.summary = 'Get Reports for Tickets sold.'
   */
  try {
    // Fetch all events along with their corresponding tickets sold
    const events = await Event.aggregate([
      {
        // Join with tickets collection to get tickets sold per event
        $lookup: {
          from: "tickets", // The collection to join
          let: { eventId: "$_id" }, // Define variable for event _id
          pipeline: [
            {
              // Match tickets for the specific event
              $match: {
                $expr: { $eq: ["$eventId", "$$eventId"] },
              },
            },
            {
              // Group tickets by eventId and calculate total tickets sold
              $group: {
                _id: "$eventId",
                count: { $sum: "$ticketsPurchased" }, // Sum tickets purchased
              },
            },
          ],
          as: "tickets", // Name the resulting field
        },
      },
      {
        // Add totalTicketsSold field to the event document
        $addFields: {
          totalTicketsSold: {
            $ifNull: [{ $arrayElemAt: ["$tickets.count", 0] }, 0], // Extract count and handle nulls
          },
        },
      },
      {
        // Project the required fields to be included in the response
        $project: {
          name: 1,
          date: 1,
          totalTickets: 1,
          availableTickets: 1,
          ticketPrice: 1,
          description: 1,
          status: 1,
          category: 1,
          duration: 1,
          location: 1,
          totalTicketsSold: 1, // Include the calculated totalTicketsSold
        },
      },
      {
        // Sort the output by date field in ascending order
        $sort: { date: 1 },
      },
    ]);

    // Return success response with the generated reports
    const message = `Reports generated successfully.`;
    const response = createSuccessResponse(message, events);
    return res.status(statusCode.OK).send(response);
  } catch (err: any) {
    // Handle any errors that occur during the process
    const message = `Internal Server Error`;
    const response = createErrorResponse(message);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response);
  }
};

export { getReports };
