import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { findOneUser } from "../../user/user.service";
import { logger } from "../../logger/logger.service";

export const auth = async (req: any, res: Response, next: NextFunction) => {
  try {
    logger.info("Getting token from header");
    const token = req.header("Authorization").split("Bearer")[1].trim();

    if (!token) {
      logger.error(`Token is missing`);
      return res.status(401).send({
        message: "Unauthorized",
        status: 401,
        additionalInfo: "Token is missing",
      });
    }
    logger.info("Verifying jwt token");
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as JwtPayload;

    const user = await findOneUser({ id: decoded._id });
    if (!user) {
      logger.error(`User not found`);
      return res.status(401).send({
        message: "Unauthorized",
        status: 401,
        additionalInfo: "User not found",
      });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    logger.error(`Error: ${error}`);
    res.status(401).send({
      message: "Unauthorized",
      status: 401,
      additionalInfo: "Invalid or expired token",
    });
  }
};
