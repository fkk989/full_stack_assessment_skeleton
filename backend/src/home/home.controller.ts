import {
  Controller,
  Get,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UsePipes,
  Put,
} from '@nestjs/common';
import { HomeService } from './home.service';
import {
  createUserHomeSchema,
  CreateUserHomeDto,
} from './dto/create-user-home.dto';
import { ZodValidationPipe } from './pipes/zodValidationPipe';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get(':username')
  findByUser(
    @Param('username') username: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.homeService.findByUser({ username, page, limit });
  }
  //
  @UsePipes(new ZodValidationPipe(createUserHomeSchema))
  @Put()
  updateUser(@Body() updateHomeDto: CreateUserHomeDto) {
    return this.homeService.updateUser(updateHomeDto);
  }
}
