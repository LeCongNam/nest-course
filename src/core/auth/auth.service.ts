import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, genSalt, hashSync } from 'bcrypt';

import { UserDto } from 'src/core/users/dto/user.dto';
import { UserService } from 'src/core/users/user.service';
import { LoginDto } from './dto/login.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    @InjectQueue('send-mail') private mailQueue: Queue,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  private _logger = new Logger(AuthService.name);

  async registerAccount(user: UserDto) {
    const isUser = await this.userService.findOneUser(user);
    console.log(`control`, isUser);

    if (isUser) {
      throw new HttpException('User is exist', HttpStatus.UNPROCESSABLE_ENTITY);
    } else {
      try {
        user['password'] = await this.hashPassword(user.password);
        const userCreated = await this.userService.saveUser(user);
        const { accessToken } = await this.generateToken({
          id: userCreated.id,
          role: userCreated.role,
        });

        this.mailQueue.add('send-mail', {
          emailReceiver: user.email,
          subject: 'Create New Account' + user.email,
        });
        this._logger.log('Register Account', userCreated.email);
        return userCreated;
      } catch (error) {
        this._logger.error(error);
      }
    }
  }

  generateToken(payload: any, isRefresh = false) {
    let refreshToken = '';
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
      algorithm: 'HS256',
      secret: this.configService.get('PRIVATE_KEY'),
    });
    if (isRefresh) {
      refreshToken = this.jwtService.sign(payload, {
        expiresIn: '90d',
        algorithm: 'HS256',
        secret: this.configService.get('PRIVATE_KEY'),
      });
      return { accessToken, refreshToken };
    }

    return { accessToken };
  }

  async hashPassword(password: string): Promise<string> {
    try {
      const saltRounds = +this.configService.get('SALT_ROUNDS');
      const salt = await genSalt(saltRounds);
      return hashSync(password, salt);
    } catch (error) {
      console.log(error);
    }
  }

  async loginWithEmail(userDto: LoginDto) {
    const user = await this.userService.findOneUser({
      email: userDto.email,
    });
    if (!user) {
      throw new HttpException('User is not exist', HttpStatus.NOT_FOUND);
    }
    const token = this.generateToken({ id: user.id, role: user.role }, true);

    const isValidPassword = await compare(userDto.password, user.password);
    if (!isValidPassword) {
      throw new HttpException(
        'Invalid password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return {
      data: user,
      token,
    };
  }
}
