import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateReportDto } from 'src/dtos/create-report.dto';
import { AuthGuard } from 'src/guards/auth.guards';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto) {
    return this.reportsService.create(body);
  }
}
