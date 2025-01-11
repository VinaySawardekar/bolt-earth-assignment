import { Request, Response } from "express";
import { statusCode } from "../../config/constants";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../../utility/customResponse";
import Event from "./model";
import Ticket from "../ticket/model";
import {
  CreateEventRequestBody,
  PurchaseTicketRequestBody,
} from "../../types/event";
import { ObjectId } from "mongoose";
import { EidRequest } from "../../types/transformRequest";

/**
 * Get all Events.
 * -
 * @description
 * Steps preformed in this method are:
 * - Step-1: Fetch All the events from the database
 * - Step-2: If events are available, return the success message and events to user.
 * - Step-3: If events are not available, return the empty data with message.
 *
 * @param {Object} req - The request object containing information about the HTTP request.
 * @param {Object} res - The response object used to send the HTTP response.
 * @returns { { status: string; message: string; data: Array<any> | null } } - The HTTP response with the success or error message.
 * @author Vinay Sawardekar <https://www.linkedin.com/in/vinay-sawardekar/>
 */
const getAllEvents = async (req: Request, res: Response) => {
  /**
   * #swagger.tags = ["Event"]
   * #swagger.summary = 'Get All Events'
   */
  try {
    /* Step-1: Fetch All the events from the database (Read method description for more details.) */
    const data = await Event.find({});
    if (data) {
      /* Step-2: If events are available, return the success message and events to user. (Read method description for more details.)*/
      const message = `Events Fetched Successfully.`;
      const response = createSuccessResponse(message, data);
      return res.status(statusCode.OK).send(response);
    } else {
      /* Step-3: If events are not available, return the empty data with message. (Read method description for more details.)*/
      const message = `Events not found!`;
      const response = createErrorResponse(message);
      return res.status(statusCode.BAD_REQUEST).send(response);
    }
  } catch (err: any) {
    const message = `Internal Server Error`;
    const response = createErrorResponse(message);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response);
  }
};

/**
 * Creates a new Event.
 * -
 * @description
 * Steps preformed in this method are:
 * - Step-1: Take the request body and create a new Event model.
 * - Step-2: Save the newEvent in the database.
 * - Step-3: If event is saved successfully, return the success message and event to user.
 * - Step-4: If event is not saved successfully, return the error message to user.
 *
 * @param {Object} req - The request object containing information about the HTTP request.
 * @param {Object} res - The response object used to send the HTTP response.
 * @returns { { status: string; message: string; data: Array<any> | null } } - The HTTP response with the success or error message.
 * @author Vinay Sawardekar <https://www.linkedin.com/in/vinay-sawardekar/>
 */
const createEvent = async (req: Request, res: Response) => {
  /**
   * #swagger.tags = ["Event"]
   * #swagger.summary = 'Create Events'
   */
  try {
    // Step-1: Take the request body and create a new Event model.
    const {
      name,
      date,
      totalTickets,
      availableTickets,
      ticketPrice,
      description,
    } = req.body as CreateEventRequestBody;

    const newEvent = new Event({
      name,
      date,
      totalTickets,
      availableTickets,
      ticketPrice,
      description,
    });
    // Step-2: Save the newEvent in the database.
    const savedEvent = await newEvent.save();
    // Step-3: If event is saved successfully, return the success message and event to user.
    const message = `Event is created successfully.`;
    const response = createSuccessResponse(message, [savedEvent]);
    return res.status(statusCode.CREATED).send(response);
  } catch (err: any) {
    console.log(err);

    // Step-4: If event is not saved successfully, return the error message to user.
    const message = `Internal Server Error`;
    const response = createErrorResponse(message);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response);
  }
};

/**
 * Retrieves an event by its ID.
 * -
 * @description
 * Steps performed in this method are:
 * - Step-1: Take eventId from the request parameters.
 * - Step-2: Fetch the event details from the Event Collection <database>.
 * - Step-3: If event is valid, return the success message and event to user.
 * - Step-4: If event is invalid, return the error message to user.
 *
 * @param {EidRequest} req - The request object containing information about the HTTP request.
 * @param {Response} res - The response object used to send the HTTP response.
 * @returns { { status: string; message: string; data: Array<any> | null } } - The HTTP response with the success or error message.
 * @author Vinay Sawardekar <https://www.linkedin.com/in/vinay-sawardekar/>
 */
const getEventsById = async (req: EidRequest, res: Response) => {
  /**
   * #swagger.tags = ["Event"]
   * #swagger.summary = 'Get Event Details By ID'
   */
  try {
    const eventId: ObjectId = req.params.id;
    // Step-2: Fetch the event details using the eventId.
    const eventData = await Event.find({ _id: eventId }, { __v: 0 });

    if (eventData) {
      // Step-3: If event is valid, return the success message and event to user.
      const message = `Event fetched successfully.`;
      const response = createSuccessResponse(message, eventData);
      return res.status(statusCode.OK).send(response);
    } else {
      // Step-4: If event is invalid, return the error message to user.
      const message = `Event details not found!`;
      const response = createErrorResponse(message);
      return res.status(statusCode.BAD_REQUEST).send(response);
    }
  } catch (err: any) {
    // Step-5: Handle any errors that occur.
    const message = `Internal Server Error`;
    const response = createErrorResponse(message);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response);
  }
};

/**
 * Purchases tickets for an event.
 * -
 * @description
 * Steps performed in this method are:
 * - Step-1: Retrieve eventId from the request parameters.
 * - Step-2: Fetch the event details using the eventId.
 * - Step-3: Extract userId and ticketsPurchased from the request body.
 * - Step-4: Check if there are enough available tickets.
 * - Step-5: Create a new ticket purchase record if tickets are available.
 * - Step-6: Update the event's available tickets count.
 * - Step-7: Return success message and purchase details.
 *
 * @param {EidRequest} req - The request object containing information about the HTTP request.
 * @param {Response} res - The response object used to send the HTTP response.
 * @returns {Promise<Response>} - The HTTP response with the success or error message.
 */
const purchaseTickets = async (req: EidRequest, res: Response) => {
  /**
   * #swagger.tags = ["Event"]
   * #swagger.summary = 'Get Event Details By ID'
   */
  try {
    // Step-1: Retrieve eventId from the request parameters.
    const eventId: ObjectId = req.params.id;

    // Step-2: Fetch the event details using the eventId.
    const eventData = await Event.findById(eventId, { __v: 0 });

    if (!eventData) {
      const message = `Event not found!`;
      const response = createErrorResponse(message);
      return res.status(statusCode.NOT_FOUND).send(response);
    }

    // Step-3: Extract userId and ticketsPurchased from the request body.
    const { userId, ticketsPurchased } = req.body as PurchaseTicketRequestBody;

    if (!userId || !ticketsPurchased || ticketsPurchased <= 0) {
      const message = `Invalid input data!`;
      const response = createErrorResponse(message);
      return res.status(statusCode.BAD_REQUEST).send(response);
    }

    const availableTickets = eventData.availableTickets;

    // Step-4: Check if there are enough available tickets.
    if (availableTickets < ticketsPurchased) {
      const message = `Not enough tickets available!`;
      const response = createErrorResponse(message);
      return res.status(statusCode.BAD_REQUEST).send(response);
    }

    // Step-5: Create a new ticket purchase record if tickets are available.
    const purchased = new Ticket({
      eventId,
      userId,
      ticketsPurchased,
      totalAmount: eventData.ticketPrice * ticketsPurchased,
      purchasedAt: new Date(),
    });

    const newTickets = await purchased.save();

    if (!newTickets) {
      const message = `Failed to purchase tickets!`;
      const response = createErrorResponse(message);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response);
    }

    // Step-6: Update the event's available tickets count.
    const availableTicketsAfterPurchase = availableTickets - ticketsPurchased;
    const updateEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        availableTickets: availableTicketsAfterPurchase,
        status: availableTicketsAfterPurchase === 0 ? "soldout" : "active",
      },
      { new: true },
    );

    if (!updateEvent) {
      const message = `Failed to update event!`;
      const response = createErrorResponse(message);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response);
    }

    // Step-7: Return success message and purchase details.
    const message = `Tickets purchased successfully.`;
    const response = createSuccessResponse(message, [newTickets]);
    return res.status(statusCode.OK).send(response);
  } catch (err: any) {
    const message = `Internal Server Error`;
    const response = createErrorResponse(message);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response);
  }
};

export { getAllEvents, createEvent, getEventsById, purchaseTickets };
