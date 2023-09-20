import { Controller, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "@shared/guards/jwt-auth.guard";

import { CatService } from "./cat.service";

@Controller("cat")
@UseGuards(JwtAuthGuard)
export class CatController {
  constructor(private readonly catService: CatService) {}
}
