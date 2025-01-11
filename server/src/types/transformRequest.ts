import { Request } from "express";
import { ObjectId } from "mongoose";

export type EidRequest = Request<{
  id: ObjectId;
  Params: { id: ObjectId };
}>;

export type SidRequest = Request<{
  Querystring: { sid: ObjectId };
}>;

export type SidPRequest = Request<{
  site_id: ObjectId;
  Params: { site_id: ObjectId };
}>;

export type ModuleNameRequest = Request<{
  Querystring: { module_name: string };
}>;

export type ModuleNameListRequest = Request<{
  Querystring: { moduleNameList: string };
}>;

export type SidAndModuleNameRequest = Request<{
  module_name: string;
  Querystring: { sid: ObjectId };
  Params: { module_name: string };
}>;

export type SidAndEntityNameRequest = Request<{
  entity_name: string;
  sid: ObjectId;
  Querystring: { sid: ObjectId };
  Params: { entity_name: string };
}>;

export type SidBundleAndEntityNameRequest = Request<{
  bundle: string;
  entity_name: string;
  Querystring: { sid: ObjectId };
  Params: { entity_name: string; bundle: string };
}>;

export type SiteSortNameRequest = Request<{
  site_sort_name: string;
  Params: { site_sort_name: string };
}>;

export interface UidSidRequest extends SidPRequest {
  userId?: ObjectId;
}
