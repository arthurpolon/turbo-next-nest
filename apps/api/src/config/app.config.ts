import { Configuration, Value } from '@itgorillaz/configify';
import { IsIn, IsNumber, Max, Min } from 'class-validator';
import z from 'zod';

const Environment = ['development', 'production', 'test'] as const;

@Configuration()
export class AppConfig {
  @IsIn(Environment)
  @Value('NODE_ENV')
  environment: (typeof Environment)[number];

  @IsNumber()
  @Min(0)
  @Max(65535)
  @Value('PORT', { parse: (value) => z.coerce.number().parse(value) })
  port: number;

  @Value('TRUSTED_ORIGINS', {
    default: '',
    parse(value_: unknown) {
      const value = z.string().parse(value_);

      return (
        value
          .split(',')
          .map((origin) => origin.trim())
          .filter((origin) => origin.length > 0) || []
      );
    },
  })
  trustedOrigins: string[];
}
