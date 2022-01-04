import { Controller, Post, Body } from '@nestjs/common';
import { CreateReportDto } from 'src/dtos/create-report.dto';

@Controller('reports')
export class ReportsController {
  @Post()
  createReport(@Body() body: CreateReportDto) {}
}
