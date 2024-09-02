import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserHomeDto } from './dto/create-user-home.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class HomeService {
  constructor(private readonly databseService: DatabaseService) {}

  async findByUser({
    username,
    page,
    limit,
  }: {
    username: string;
    page: number;
    limit: number;
  }) {
    try {
      const start = (page - 1) * limit;
      const homeDetails = await this.databseService.home.findMany({
        where: {
          users: {
            some: {
              username,
            },
          },
        },
        skip: start,
        take: limit,
      });
      return homeDetails;
    } catch (error) {
      throw new BadRequestException(error.message).getResponse();
    }
  }

  async updateUser(data: CreateUserHomeDto) {
    try {
      // getting all user_home data for street address
      const user_home = await this.databseService.user_home.findMany({
        where: {
          street_address: data.street_address,
        },
      });
      //
      const usersToDelete: { username: string; street_address: string }[] = [];
      const usersToAdd: { username: string; street_address: string }[] = [];
      //

      // adding all uncheck data to usersToAdd Array will skip duplicate while creating
      data.users.forEach((user) => {
        // temp user home data
        const tempUserHome = {
          username: user.username,
          street_address: data.street_address,
        };

        if (user.isChecked) {
          usersToAdd.push(tempUserHome);
        }
      });
      //

      user_home.forEach((home_user) => {
        data.users.forEach((input_user) => {
          const tempUserHome = {
            username: input_user.username,
            street_address: data.street_address,
          };
          // pushing all user to userToDelte array if they are present in user_home talbe but are uncecked by user
          if (
            home_user.username === input_user.username &&
            !input_user.isChecked
          ) {
            usersToDelete.push(tempUserHome);
          }
        });
      });
      //

      // check for not allowing user to remove all user form particular home
      if (
        user_home.length === usersToDelete.length &&
        usersToAdd.length === 0
      ) {
        throw new BadRequestException('one user must be checked');
      }

      // deleting uncheck records
      let deletedRecordCount = 0;
      if (usersToDelete.length !== 0) {
        const deletedRecords = await this.databseService.user_home.deleteMany({
          where: {
            OR: usersToDelete.map((data) => data),
          },
        });
        deletedRecordCount = deletedRecords.count;
      }

      //adding new checked records
      let newRecordCount = 0;
      if (usersToAdd.length !== 0) {
        const newRecords = await this.databseService.user_home.createMany({
          data: usersToAdd,
          skipDuplicates: true,
        });
        newRecordCount = newRecords.count;
      }

      return {
        success: true,
        message: `deleted ${deletedRecordCount} users and added ${newRecordCount} users in home`,
      };
    } catch (error) {
      throw new BadRequestException(error.message).getResponse();
    }
  }
}
