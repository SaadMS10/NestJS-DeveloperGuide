import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true,
    }),
    // MongooseModule.forRoot(
    //   'mongodb+srv://saad:Error1234.@cluster0.wjtwr.mongodb.net/nestjs-demo?retryWrites=true&w=majority',
    // ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
