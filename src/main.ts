import { ZodValidationPipe } from "@anatine/zod-nestjs";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import {
  FastifyAdapter,
  NestFastifyApplication
} from "@nestjs/platform-fastify";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.useGlobalPipes(new ZodValidationPipe());

  await app.listen(3000);
}
bootstrap();
