import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../utils/base-entity";
import { IsEmail, IsNotEmpty, isNumber } from "class-validator";
import { CustomError } from "../utils/custom-error.model";
import { AppDataSource } from "../database/data-store";
import { Exclude } from "class-transformer";
import * as bcrypt from "bcryptjs";
@Entity()
export class User extends BaseEntity {
	@Column({ default: "name" })
	@IsNotEmpty()
	name!: string;

	@Column({ unique: true })
	@IsNotEmpty()
	@IsEmail()
	username!: string;
	@BeforeInsert()
	async checkUsername() {
		const userRepository = AppDataSource.getRepository(User);
		const user = await userRepository.findOne({
			where: { username: this.username },
		});
		if (user) {
			throw new CustomError("Username already exists", 409, "conflict");
		}
	}

	@Column({ unique: true })
	@IsNotEmpty()
	@IsEmail()
	email!: string;
	@BeforeInsert()
	async checkEmailExist() {
		const userRepository = AppDataSource.getRepository(User);
		const user = await userRepository.findOne({ where: { email: this.email } });
		if (user) {
			throw new CustomError("Email already exists", 409, "conflict");
		}
	}

	@Column()
	@IsNotEmpty()
	@Exclude({ toPlainOnly: true })
	password!: string;
	@BeforeInsert()
	@BeforeUpdate()
	async encryptPassword() {
		if (this.password) {
			const salt = await bcrypt.genSalt();
			this.password = await bcrypt.hash(this.password, salt);
		}
	}


}
