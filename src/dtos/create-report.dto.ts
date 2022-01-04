import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';
export class CreateReportDto {
  @IsString()
  make: string;
  @IsString()
  model: string;

  @IsNumber()
  price: number;

  @IsNumber()
  year: number;

  @IsNumber()
  lng: number;

  @IsNumber()
  lat: number;

  @IsNumber()
  mileage: number;
}
