import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "dotenv";
import { CustomError } from "./custom-error.model";
config();
export const createAuthToken = (id: number) => {
	const token = jwt.sign(
		{
			_id: id.toString(),
		
		},
		process.env.TOKEN_SECRET as string,
		{
			expiresIn: process.env.JWT_EXPIRY,
		}
	);
	return token;
};

export const createRefreshToken = (id: number) => {
	return jwt.sign(
		{ _id: id.toString() },
		process.env.JWT_REFRESH_SECRET as string,
		{
			expiresIn: process.env.JWT_EXPIRY,
		}
	);
};

export const verifyToken = (token: string, secret: string) => {
	try {
		return jwt.verify(
			token,
			process.env.JWT_REFRESH_SECRET as string
		) as JwtPayload;
	} catch (error) {
		throw new CustomError("Invalid", 401, "Unauthorized.");
	}
};

export const getTokens = (id: number) => {
	return {
		accessToken: createAuthToken(id),
		refreshToken: createRefreshToken(id),
	};
};
