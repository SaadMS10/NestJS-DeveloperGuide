import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
  Get,
  Query,
} from '@nestjs/common';
import { CreateReportDto } from '../dtos/create-report.dto';
import { AuthGuard } from '../guards/auth.guards';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ReportsService } from './reports.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from '../dtos/report.dto';
import { ApproveReportDto } from '../dtos/approve-report.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GetEstimateDto } from '../dtos/get-estimate.dto';
// import { AdminGuard } from '../guards/admin.guard';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }
  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved);
  }
  @Get()
  getEstimateDto(@Query() query: GetEstimateDto) {
    return this.reportsService.calculateEstimate(query);
  }
}
