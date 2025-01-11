import { Request, Response } from "express";
import { statusCode } from "../../config/constants";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../../utility/customResponse";
import User from "./model";
import { ObjectId } from "mongoose";
import { environment } from "../../config/environment";

/**
 * Gets User Role.
 * -
 * @description
 * Gets the role of the user using the userId present in the request.
 * Steps preformed in this method are:
 * - Step-1: Take userId from the request.
 * - Step-2: Verify the user from the User Collection <database>.
 * - Step-3: If user is valid, return the success message and role to user.
 * - Step-4: If user is invalid, return the error message to user.
 *
 * @param {Object} req - The request object containing information about the HTTP request.
 * @param {Object} res - The response object used to send the HTTP response.
 * @returns { { status: string; message: string; data: Array<any> | null } } - The HTTP response with the success or error message.
 * @author Vinay Sawardekar <https://www.linkedin.com/in/vinay-sawardekar/>
 */
const getUserRole = async (req: Request, res: Response) => {
  /**
   * #swagger.tags = ["User"]
   * #swagger.summary = 'Get User Role'
   */
  try {
    /* Step-1: Take userId from the request. (Read method description for more details.) */

    /* Step-2: Verify the user from the User Collection <database>. (Read method description for more details.)*/
    const data = await User.find({});
    if (data) {
      /* Step-3: : If user is valid, return the success message and role to user. (Read method description for more details.)*/
      const message = `User Role Fetched Successfully.`;
      const response = createSuccessResponse(message, data);
      return res.status(statusCode.OK).send(response);
    } else {
      /* Step-4: If user is invalid, return the error message to user. (Read method description for more details.)*/
      const message = `User not found!`;
      const response = createErrorResponse(message);
      return res.status(statusCode.BAD_REQUEST).send(response);
    }
  } catch (err: any) {
    // Handle the error
    if (err.kind == "ObjectId") {
      const message = `Provided User Id is Invalid.`;
      const response = createErrorResponse(message);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response);
    }
    const message = `Internal Server Error`;
    const response = createErrorResponse(message);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response);
  }
};

/**
 * Gets Default User Details.
 * -
 * @description
 * Steps preformed in this method are:
 * - Step-1: Take userId from the request.
 * - Step-2: Verify the user from the User Collection <database>.
 * - Step-3: If user is valid, return the success message and details to user.
 * - Step-4: If user is invalid, return the error message to user.
 *
 * @param {Object} req - The request object containing information about the HTTP request.
 * @param {Object} res - The response object used to send the HTTP response.
 * @returns { { status: string; message: string; data: Array<any> | null } } - The HTTP response with the success or error message.
 * @author Vinay Sawardekar <https://www.linkedin.com/in/vinay-sawardekar/>
 */
const getUser = async (req: Request, res: Response) => {
  /**
   * #swagger.tags = ["User"]
   * #swagger.summary = 'Get Default User Details'
   */
  try {
    // Step-1: Take userId from the request. (Read method description for more details.)
    const userDetails = await User.find(
      {
        email: environment.config.DEFUALT_USER_EMAIL,
      },
      {
        __v: 0,
        password: 0,
        role: 0,
        createdAt: 0,
        updatedAt: 0,
      }
    );
    if (userDetails) {
      // Step-3: : If user is valid, return the success message and details to user. (Read method description for more details.)
      const message = `User Fetched Successfully.`;
      const response = createSuccessResponse(message, userDetails);
      return res.status(statusCode.OK).send(response);
    } else {
      // Step-4: If user is invalid, return the error message to user. (Read method description for more details.)
      const message = `User not found!`;
      const response = createErrorResponse(message);
      return res.status(statusCode.BAD_REQUEST).send(response);
    }
  } catch (error: any) {
    // Catch any errors
    const message = `Internal Server Error`;
    const response = createErrorResponse(message);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response);
  }
};

export { getUserRole, getUser };
