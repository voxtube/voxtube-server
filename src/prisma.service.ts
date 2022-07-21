import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // making prisma connect to the database immediately the app is executed
  async onModuleInit() {
    await this.$connect();
    await this.init();
  }

  //init
  async init() {
    const tos = await this.tos.findMany();
    const policy = await this.policy.findMany();

    if (!tos.length)
      await this.tos.create({
        data: { content: '' },
      });

    if (!policy.length)
      await this.policy.create({
        data: { content: '' },
      });
  }

  // disconnecting the database while the app is closing
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
