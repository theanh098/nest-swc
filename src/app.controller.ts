import { Controller, Get, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "~/shared/guards/jwt-auth.guard";

import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
