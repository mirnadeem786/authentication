import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.entity";
import { config } from "dotenv";
config();
import { AppDataSource } from "../database/data-store";
export const parseJWT = async (
	jwtToken: string
): Promise<User | null> => {
	try {
		const decoded: JwtPayload = jwt.verify(
			jwtToken,
			process.env.TOKEN_SECRET
		) as JwtPayload;

		let user: User  | null = null;
			user = await AppDataSource.manager.findOne(User, {
				where: { id: decoded._id },
			});
		}
		return user;
	} catch (e) {
		return null;
	}
};


export const getUserIdFromToken = async (token: string) => {
	const decoded: JwtPayload = jwt.verify(
		token,
		process.env.TOKEN_SECRET
	) as JwtPayload;
	return decoded._id
}