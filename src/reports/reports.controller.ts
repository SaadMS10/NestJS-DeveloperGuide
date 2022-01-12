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
import { CreateReportDto } from 'src/dtos/create-report.dto';
import { AuthGuard } from 'src/guards/auth.guards';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ReportsService } from './reports.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from 'src/dtos/report.dto';
import { ApproveReportDto } from 'src/dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from 'src/dtos/get-estimate.dto';
// import { AdminGuard } from 'src/guards/admin.guard';

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
