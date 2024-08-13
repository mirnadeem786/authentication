import { AppDataSource } from "../database/data-store";
import { User } from "../user/user.entity";
import { CustomError } from "../utils/custom-error.model";
import { getTokens } from "../utils/jwt-token-generator";
import { SigninDto } from "./dto/signin.dto";
import * as bcrypt from "bcryptjs";
import { instanceToPlain } from "class-transformer";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { createUser, findOneUser, } from "../user/user.service";
import { logger } from "../logger/logger.service";


export const register = async (createUserDto: CreateUserDto) => {
	logger.info(`Initiate register service`);

	const user = await createUser(createUserDto);
	const userResponse = instanceToPlain(user);
	const { accessToken, refreshToken } = getTokens(user.id);

	logger.info(`Register service returning response`);
	return { accessToken, refreshToken, userResponse };
};

export const signin = async (signinDto: SigninDto) => {
	logger.info(`Initiate signin service`);

	const user = await findOneUser({ email: signinDto.email });
	if (!user) {
		logger.warn(`Invalid username or password`);
		throw new CustomError("Unauthorized", 401, "Invalid username or password");
	}

	if (!(await bcrypt.compare(signinDto.password, user.password))) {
		logger.warn(`invalid username or password`);
		throw new CustomError("Unauthorized", 401, "Invalid username or password");
	}
	const userResponse = instanceToPlain(user);
	const { accessToken, refreshToken } = getTokens(user.id);

	logger.info(`Signin service returning response`);
	return { accessToken, refreshToken, userResponse };
};




