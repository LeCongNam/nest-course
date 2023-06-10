import {
  HttpException,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, genSalt, hashSync } from 'bcrypt';

import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/core/users/dto/user.dto';
import { EVENT_NAME } from 'src/event-emitter/constants';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Provider } from '../search/constant';
import { SearchService } from '../search/service/search.service';
import { UserService } from '../users/user.service';
import { LoginDto } from './dto/login.dto';

export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    @Inject(Provider.SearchService) private _searchService: SearchService,
    private _userService: UserService,
    private eventEmitter: EventEmitter2,
  ) {}

  private _logger = new Logger(AuthService.name);

  public async registerAccount(user: UserDto) {
    try {
      const isUser = await this.prisma.user.findFirst({
        where: {
          OR: [
            {
              username: user.username,
            },
            {
              email: user.email,
            },
          ],
        },
      });

      if (isUser) {
        throw new HttpException(
          'User is exist',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      } else {
        user.password = await this.hashPassword(user.password);
        const userCreated = await this.prisma.user.create({
          data: user,
        });

        const es = await this._searchService.indexedDB(userCreated, 'user');

        // Queue mail
        const linkVerify =
          (await this.configService.getOrThrow('DOMAIN')) +
          `/user/verify-email?token=${
            this.generateToken({ email: userCreated.email }, false).accessToken
          }`;
        this.eventEmitter.emit(EVENT_NAME.SEND_MAIL, {
          emailReceiver: userCreated.email,
          subject: userCreated.username,
          linkVerify,
        });

        this._logger.log('Register Account', userCreated.email);
        return userCreated;
      }
    } catch (error) {
      this._logger.log(error); // spam logger
      throw new InternalServerErrorException();
    }
  }

  public generateToken(
    payload: {
      id?: string;
      roleId?: number;
      [key: string]: any;
    },
    isRefresh = false,
  ): { accessToken: string; refreshToken?: string } {
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

  public async hashPassword(password: string): Promise<string> {
    try {
      const saltRounds = +this.configService.get('SALT_ROUNDS');
      const salt = await genSalt(saltRounds);
      return hashSync(password, salt);
    } catch (error) {
      console.log(error);
    }
  }

  public async loginWithEmail(userDto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: userDto.email,
      },
    });
    if (!user) {
      throw new HttpException('User is not exist', HttpStatus.NOT_FOUND);
    }
    const token = this.generateToken(
      { id: user.id, roleId: user.roleId },
      true,
    );

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
