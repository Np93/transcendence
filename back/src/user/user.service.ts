import { ConflictException, Injectable, Logger, NotFoundException, UnauthorizedException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AvatarDto } from './dtos/AvatarDto';
import { JwtService } from '@nestjs/jwt'
import { UserDto } from './dtos/UserDto';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { Socket } from 'socket.io';
import { PipelinePromise } from 'stream';

@Injectable()
export class UserService {

	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>, private jwtService: JwtService) { }

	async validateUser(id: number): Promise<UserDto> {
		const user = await this.usersRepository.findOne({ where: { id: id } })
		if (!user) throw new NotFoundException("user not found")
		return user;
	}

	async validateUserByName(name: string): Promise<User> {
		const user = await this.usersRepository.findOne({ where: { username: name } })
		if (!user) throw new NotFoundException("user not found")
		return user;
	}

	async setTfaSecret(secret: string, username: string) {
		const user = await this.usersRepository.findOne({ where: { username: username } })
		await this.usersRepository.update(user.id, { twoFaSecret: secret })
	}

	async generateTfaSecret(username: string) {
		const secret = authenticator.generateSecret();
		const otpauthUrl = authenticator.keyuri(username, 'AUTH_APP_NAME', secret);
		await this.setTfaSecret(secret, username);
		return otpauthUrl
	}

	async generateQrCode(otpauthUrl: string) {
		return toDataURL(otpauthUrl);
	}
	async getUsers() {
		return await this.usersRepository.find();
	}


	async setConnection(user: User) {
		await this.usersRepository.update(user.id, { connected: true })
		Logger.log("user connected")
	}

	async setDisconnect(user: User) {
		await this.usersRepository.update(user.id, { connected: false })
		Logger.log("user disconnected")
	}
}


/*async postAvatar(body: AvatarDto) {
	const {avatar} = body
	const user = this.usersRepository.create({...body})
	await this.usersRepository.save(user)
	return "avatar mis a jour"
}*/

