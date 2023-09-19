import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { DATABASE } from '@constants/token.constant';
import { ConfigService } from '@nestjs/config';
import { Database, getDb } from '@database/pool';

@Module({
  imports: [CatModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DATABASE,
      useFactory: (configService: ConfigService): Database =>
        getDb({
          connectionString: configService.get<string>('DATABASE_URL'),
        }),
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
