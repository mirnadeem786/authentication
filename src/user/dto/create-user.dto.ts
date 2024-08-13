import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class CreateUserDto {
	@IsNotEmpty({ message: "Name is required" })
	@IsString()
	name!: string;

	@IsNotEmpty({ message: "Username is required" })
	@IsString()
	username!: string;

	@IsNotEmpty({ message: "Email is required" })
	@IsEmail({}, { message: "Invalid email format" })
	@IsString()
	email!: string;

	@IsNotEmpty({ message: "Password is required" })
	@IsString()
	password!: string;
}
