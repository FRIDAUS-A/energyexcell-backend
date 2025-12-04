import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './interfaces';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  async get(@GetUser() user: User): Promise<User> {
    return user;
  }

  async update(
    @GetUser() user: User,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      user._id,
      { $set: updateUserDto },
      { new: true, runValidators: true },
    );

    return updatedUser;
  }

  async updatePassword(
    @GetUser() user: User,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<{ message: string }> {
    const loginUser = await this.userModel.findById(user._id);
    const confirmPassword = await argon2.verify(
      loginUser.password,
      updatePasswordDto.oldPassword,
    );
    if (!confirmPassword) throw new ForbiddenException('Invalid Old Password');

    if (updatePasswordDto.newPassword !== updatePasswordDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    await this.userModel.updateOne(
      { id: user._id },
      {
        $set: {
          password: await argon2.hash(updatePasswordDto.newPassword),
        },
      },
    );

    return { message: 'password changed' };
  }

  async delete(@GetUser() user: User) {
    await this.userModel.deleteOne({ _id: user._id });
  }
}
