import { Injectable } from '@nestjs/common';

import { createAuth } from '@workspace/auth';
import { AppConfig } from 'src/config/app.config';
import { BetterAuthConfig } from 'src/config/better-auth.config';
import { DatabaseService } from 'src/database/database.service';

type TAuth = ReturnType<typeof createAuth>;

@Injectable()
export class BetterAuthService {
  client: TAuth;

  constructor(
    private dbService: DatabaseService,
    private betterAuthConfig: BetterAuthConfig,
    private appConfig: AppConfig,
  ) {
    this.client = createAuth({
      drizzleInstance: this.dbService.client,
      basePath: this.betterAuthConfig.basePath,
      baseURL: this.betterAuthConfig.baseUrl,
      secret: this.betterAuthConfig.secret,

      trustedOrigins: this.appConfig.trustedOrigins,
    });
  }
}
