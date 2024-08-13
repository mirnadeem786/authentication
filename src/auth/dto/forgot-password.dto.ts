import { Transform } from "class-transformer";
import { IsNotEmpty, IsEmail } from "class-validator";

export class ForgotPasswordDto {
	@IsNotEmpty()
	@Transform(({ value }) => value?.toLowerCase().trim())
	@IsEmail()
	email!: string;
}
