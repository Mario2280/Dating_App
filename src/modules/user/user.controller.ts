import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  //Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  UserCreateDto,
  UserUpdateDto,
  UserEntity,
  UserFilterDto,
  UserValidateDto,
} from '@validation/user';

@Controller('profile')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: UserCreateDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findMany(@Body() filterUserDto: UserFilterDto) {
    return this.userService.findMany(filterUserDto);
  }

  @Get(':telegram_id')
  async findOne(@Param('telegram_id') id: string): Promise<UserEntity | null> {
    return await this.userService.findOne(BigInt(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UserUpdateDto,
  ): Promise<UserEntity> {
    return this.userService.update(BigInt(id), updateUserDto);
  }

  @Post('validate')
  validate(@Body() validateUserDto: UserValidateDto) {
    return this.userService.isValidateTelegramData(validateUserDto);
  }
}
