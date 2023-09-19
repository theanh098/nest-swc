import { Controller, UseGuards } from '@nestjs/common';
import { CatService } from './cat.service';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';

@Controller('cat')
@UseGuards(JwtAuthGuard)
export class CatController {
  constructor(private readonly catService: CatService) {}
}
