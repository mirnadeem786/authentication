import { NextFunction, Response } from "express";
import { AbstractApiResponse } from "../utils/api-response";
import { dashboard, findOneUser } from "./user.service";
import { logger } from "../logger/logger.service";
import { instanceToPlain } from "class-transformer";

export const userProfileHandler = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(`Fetching  user profile`, req);

    const user = await findOneUser({ id: req.user.id });
    logger.info(`Converting user into plain object `);
    const userResponse = instanceToPlain(user);
    const result = AbstractApiResponse.success(userResponse);
    res.json(result);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const userDashboardHandler = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(`Fetching  dashboard`);
    const response = await dashboard();
    const result = AbstractApiResponse.success(response);
    res.json(result);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
