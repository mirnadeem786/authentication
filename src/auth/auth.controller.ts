import { Request, Response, NextFunction } from "express";
import { AbstractApiResponse } from "../utils/api-response";
import validateAndTransform from "../utils/validators";
import { SigninDto } from "./dto/signin.dto";
import { CreateUserDto } from "../user/dto/create-user.dto";
import {

	register,

	signin,

} from "./auth.service";

import { logger } from "../logger/logger.service";

export const signupHandler = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	logger.info(`Initiate Signuphandler`);

	try {
		const validationResult = await validateAndTransform(
			CreateUserDto,
			req.body
		);

		if (Array.isArray(validationResult)) {
			const errorMessages = validationResult
				.map((error) => {
					if (error.constraints) {
						return Object.values(error.constraints);
					}
					return [];
				})
				.flat();

			return res.status(400).json({ errors: errorMessages });
		}

		logger.info(`Calling register service`);
		const response = await register(req.body);
		const result = AbstractApiResponse.created(
			response,
			"Registration successful",
			201
		);
		res.json(result).status(result.status);
	} catch (error) {
		next(error);
	}
};

export const signinHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	logger.info(`Initiate signinHandler`);

	try {
		const validationResult = await validateAndTransform(SigninDto, req.body);

		if (Array.isArray(validationResult)) {
			const errorMessages = validationResult
				.map((error) => {
					if (error.constraints) {
						return Object.values(error.constraints);
					}
					return [];
				})
				.flat();

			return res.status(400).json({ errors: errorMessages });
		}

		logger.info(`Calling signin service`);
		const response = await signin(req.body);
		const result = AbstractApiResponse.success(
			response,
			"Login successful",
			200
		);
		res.json(result).status(result.status);
	} catch (error) {
		console.log(error)
		next(error);
	}
};

