import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDto } from 'src/dtos/create-report.dto';
import { Repository } from 'typeorm';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}
  create(reportDto: CreateReportDto) {
    const report = this.repo.create(reportDto);
    return this.repo.save(report);
  }
}
