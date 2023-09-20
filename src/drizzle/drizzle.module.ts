import { Global, Module } from "@nestjs/common";

import { DATABASE } from "@shared/constants/token.constant";
import { ConfigService } from "@nestjs/config";
import { Database, getDb } from "~/shared/database";

@Global()
@Module({
  providers: [
    {
      provide: DATABASE,
      useFactory: (configService: ConfigService): Database =>
        getDb({
          connectionString: configService.get<string>("DATABASE_URL")
        }),
      inject: [ConfigService]
    }
  ]
})
export class DrizzleModule {}
