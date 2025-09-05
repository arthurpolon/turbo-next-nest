import { Injectable } from '@nestjs/common';
import { createDatabase } from '@workspace/database';
import { DatabaseConfig } from 'src/config/database.config';

@Injectable()
export class DatabaseService {
  client: ReturnType<typeof createDatabase>;

  constructor(private dbConfig: DatabaseConfig) {
    this.client = createDatabase({
      databaseUrl: this.dbConfig.databaseUrl,
    });
  }
}
