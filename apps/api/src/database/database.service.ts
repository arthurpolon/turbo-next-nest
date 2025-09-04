import { Injectable } from '@nestjs/common';
import Database from '@workspace/database';

@Injectable()
export class DatabaseService {
  client = Database;
}
