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
  Session,
  UseGuards,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UpdateUserDto } from 'src/dtos/update-user-dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import {
  SerializerInterceptor,
  Serialize,
} from '../interceptors/serialize.interceptor';
import { UserDto } from 'src/dtos/user-dto';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptors';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guards';
@Controller('auth')
@Serialize(UserDto) //custom interceptors
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

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

  @Get('/colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    session.color = color;
  }
  @Get('/colors')
  getColor(@Session() session: any) {
    return session.color;
  }
}
