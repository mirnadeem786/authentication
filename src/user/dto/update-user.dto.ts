import { IsNotEmpty, IsEmail, IsString, IsOptional } from "class-validator";

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	avtar?: string;

	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsEmail({}, { message: "Invalid email format" })
	@IsString()
	email?: string;

	@IsOptional()
	@IsString()
	password?: string;
}
