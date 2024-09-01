import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databseService: DatabaseService) {}
  //
  async findAll() {
    try {
      //
      const users = await this.databseService.user.findMany();
      return users;
      //
    } catch (error) {
      //
      throw new BadRequestException(error.message).getResponse();
    }
  }
  //
  async findByHOme(home: string) {
    const street_address = home.split('-').join(' ');
    console.log('street address', street_address);
    try {
      //
      const users = await this.databseService.user.findMany({
        where: {
          homes: {
            some: {
              street_address,
            },
          },
        },
      });
      return users;
      //
    } catch (error) {
      //
      throw new BadRequestException(error.message).getResponse();
    }
  }
  //
}
