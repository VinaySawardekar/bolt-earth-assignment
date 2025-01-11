import { Request } from "express";
import { ObjectId } from "mongoose";

export type EidRequest = Request<{
  id: ObjectId;
  Params: { id: ObjectId };
}>;
