import { FindOptionsWhere, DeepPartial } from "typeorm";
import { AppDataSource } from "../database/data-store";
import { CustomError } from "../utils/custom-error.model";
import { createTimeStamp } from "../utils/general-functions";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { instanceToPlain } from "class-transformer";
import { logger } from "../logger/logger.service";


export const createUser = async (
	createUserDto: CreateUserDto
): Promise<User> => {
	logger.info(`Initiate createUser service`);
	const userEntity = await AppDataSource.manager.create(User, {
		...createUserDto,
		createdAt: createTimeStamp(),
		updatedAt: createTimeStamp(),
	});

	const user = await AppDataSource.manager.save(userEntity);
	if (!user) {
		logger.error(`Error while creating the user`);
		throw new CustomError(
			"Internal Server Error",
			500,
			"Error while creating the user"
		);
	}
	return user;
};

export const findOneUser = async (
	options: FindOptionsWhere<User>
): Promise<User | null> => {
	logger.info(`Initiate findOneUser service`);
	const user = await AppDataSource.manager.findOneBy(User, options);
	logger.info(`Returning response from findOneUser service`);
	return user;
};

export const dashboard = async() => {
	logger.info(`Initiate dashboard service`);
	logger.info(`Fetching  data from  third party api`);
	const response = await fetch("https://jsonplaceholder.typicode.com/posts");
	logger.info(`Converting  data into  json`);
	const data = await response.json();
	logger.info(`Returning  json data `);
	return data;
}

