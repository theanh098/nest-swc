import { NestFactory } from "@nestjs/core";
import { ZodValidationPipe } from "@anatine/zod-nestjs";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ZodValidationPipe());
  await app.listen(3000);
}
bootstrap();
