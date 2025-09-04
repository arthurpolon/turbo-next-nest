import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { user } from '@workspace/database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
  constructor(private drizzleService: DatabaseService) {}

  async findAll() {
    const users = await this.drizzleService.client.query.user.findMany();

    return users;
  }

  async findOne(id: string) {
    const selected = await this.drizzleService.client.query.user.findFirst({
      where: eq(user.id, id),
    });

    return selected;
  }
}
