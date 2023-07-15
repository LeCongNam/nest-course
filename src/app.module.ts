import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/auth/auth.module';
import { NotificationModule } from './core/auth/notification/notification.module';
import { ProductsModule } from './core/products/products.module';
import { SearchModule } from './core/search/search.module';
import { UserModule } from './core/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        // entities: [],
        autoLoadEntities: true,
        synchronize: true,
        // logging: ['query', 'error', 'info'],
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
        // password: process.env.RABBITMQ_DEFAULT_PASS,
        // username: process.env.RABBITMQ_DEFAULT_USER,
      },
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          ignoreTLS: true,
          secure: true,
          auth: {
            user: configService.get('MAILDEV_INCOMING_USER'),
            pass: configService.get('MAILDEV_INCOMING_PASS'),
          },
        },
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: process.cwd() + '/src/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('PRIVATE_KEY'),
        signOptions: { expiresIn: '30 days' },
      }),
      inject: [ConfigService],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      fallbacks: {
        'en-CA': 'fr',
        'en-*': 'en',
        'fr-*': 'fr',
        pt: 'pt-BR',
      },
      loaderOptions: {
        path: join(process.cwd(), '/src/i18n/'),
        watch: true,
        outDir: '/dist/src',
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    SearchModule,
    UserModule,
    AuthModule,
    NotificationModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // public configure(consumer: MiddlewareConsumer) {
  //   // consumer.apply(AppMiddleware).forRoutes('*');
  // }
}
