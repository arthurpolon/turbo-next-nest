import { Logger, Module, NestModule } from '@nestjs/common';
import { BetterAuthService } from './better-auth.service';
import { AuthController } from './auth.controller';
import { HttpAdapterHost } from '@nestjs/core';
import { toNodeHandler } from '@workspace/auth/node';
import type { Express } from 'express';
import { json as jsonParser } from 'express';
import { DatabaseModule } from 'src/database/database.module';
import { AppConfig } from 'src/config/app.config';
import { BetterAuthConfig } from 'src/config/better-auth.config';

@Module({
  providers: [BetterAuthService],
  controllers: [AuthController],
  exports: [BetterAuthService],
  imports: [DatabaseModule],
})
export class AuthModule implements NestModule {
  private readonly logger = new Logger(AuthModule.name);
  constructor(
    private readonly adapter: HttpAdapterHost,
    private readonly betterAuthService: BetterAuthService,
    private appConfig: AppConfig,
    private betterAuthConfig: BetterAuthConfig,
  ) {}

  configure(): void {
    this.adapter.httpAdapter.enableCors({
      origin: this.appConfig.trustedOrigins,
      methods: ['GET', 'PATCH', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
      ],
      credentials: true,
    });

    const handler = toNodeHandler(this.betterAuthService.client);
    const instance: Express = this.adapter.httpAdapter.getInstance();

    instance.use(`${this.betterAuthConfig.basePath}/*path`, (req, res) => {
      return handler(req, res);
    });

    // Add JSON body parser after BetterAuth routes
    instance.use(jsonParser());

    this.logger.log(
      `AuthModule initialized BetterAuth on '${this.betterAuthConfig.basePath}/*'`,
    );
  }
}
