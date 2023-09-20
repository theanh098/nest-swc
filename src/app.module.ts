import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CatModule } from "./cat/cat.module";
import { DrizzleModule } from "./drizzle/drizzle.module";

@Module({
  imports: [CatModule, DrizzleModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
