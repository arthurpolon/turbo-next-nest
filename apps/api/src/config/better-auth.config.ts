import { Configuration, Value } from '@itgorillaz/configify';
import { IsString } from 'class-validator';

@Configuration()
export class BetterAuthConfig {
  @IsString()
  @Value('BETTER_AUTH_SECRET')
  secret: string;

  @IsString()
  @Value('BETTER_AUTH_URL')
  baseUrl: string;

  @IsString()
  @Value('BETTER_AUTH_BASE_PATH')
  basePath: string;
}
