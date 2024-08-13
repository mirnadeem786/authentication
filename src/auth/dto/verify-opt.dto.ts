import { Transform } from "class-transformer";
import { IsNotEmpty, IsEmail } from "class-validator";

export class VerifyOTPDto {
	@IsNotEmpty()
	@Transform(({ value }) => value?.toLowerCase().trim())
	@IsEmail()
	email!: string;

	@IsNotEmpty()
	otp!: string;
}
