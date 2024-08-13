import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";

// Add a type constraint to ensure T extends object
async function validateAndTransform<T extends object>(
	dtoClass: new () => T,
	requestBody: any
): Promise<ValidationError[] | T> {
	const dtoInstance = plainToClass(dtoClass, requestBody);
	const errors = await validate(dtoInstance);

	if (errors.length > 0) {
		return errors;
	}
	return dtoInstance;
}

export default validateAndTransform;
