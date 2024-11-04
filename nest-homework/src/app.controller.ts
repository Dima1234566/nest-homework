/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create.user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './app.model';

@ApiTags('Управління юзерами')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiOperation({ summary: "Find User" })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  findAllUsers() {
    return this.appService.findAllUsers();
  }

  @ApiOperation({ summary: "Create User" })
  @ApiResponse({ status: 200, type: User })
  @Post('create')
  createUser(@Body() user: CreateUserDto) {
    return this.appService.create(user);
  }

  @ApiOperation({ summary: "Update TOKEN" })
  @ApiResponse({ status: 200, type: Object })
  @Post("refresh")
  async refreshToken(@Body() refresh: string) {
    return await this.appService.refreshToken(refresh);
  }


}
