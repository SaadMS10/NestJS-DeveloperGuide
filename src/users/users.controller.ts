import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  Body,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UpdateUserDto } from 'src/dtos/update-user-dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import {
  SerializerInterceptor,
  Serialize,
} from '../interceptors/serialize.interceptor';
import { UserDto } from 'src/dtos/user-dto';
@Controller('auth')
@Serialize(UserDto) //custom interceptors and decorators
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/:id')
  findUser(@Param('id') id: string) {
    const user = this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  //   @UseInterceptors(ClassSerializerInterceptor) //Put Exclude In User Entity
  //   @UseInterceptors(new SerializerInterceptor(UserDto)) //custom interceptors

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signup(body.email, body.password);
  }
  @Post('/signin')
  signin(@Body() body: CreateUserDto) {
    return this.authService.signin(body.email, body.password);
  }
}
