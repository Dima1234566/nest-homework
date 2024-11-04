/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './app.model';
import { CreateUserDto } from './dto/create.user.dto';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

@Injectable()
export class AppService {
  constructor(@InjectModel(User) private userModel: typeof User) { }

  async create(user: CreateUserDto) {
    try {
      const regUser = await this.userModel.create(user)
      return regUser
    } catch (error) {
      console.error(error);
    }
  }

  async findAllUsers() {
    return await this.userModel.findAll({
      include: { all: true }
    });

  }
  async findEmail(email: string) {
    const user = await this.userModel.findOne({ where: { email }, include: { all: true } })
    if (user) {
      return user;
    }
    console.error("User not found");
  }

  // jwt токен під роботу з юзером . на створення юзера токен щоб давало

  async createToken(userId: number) {
    const payLoad = {
      id: userId
    }
    const secret = process.env.SECRET_KEY;
    const token = sign(payLoad, secret, { expiresIn: "30m" })

    const refreshToken = sign(payLoad, secret, { expiresIn: "1day" })
    try {
      await this.userModel.update(
        { access_token: token, refresh_token: refreshToken }, // Нові дані
        { where: { id: userId } } // Умова оновлення
      );
      return await this.userModel.findOne({ where: { id: userId }, include: { all: true } })
    } catch (error) {
      console.error(error);

    }
  }

  async findToken(req: any) {
    try {
      const { authorization = '' } = req.headers;

      const [bearer, token] = authorization.split(' ');

      if (bearer !== 'Bearer') {
        console.log("user not in a base");
      }
      const secret = process.env.SECRET_KEY;

      const findId = verify(token, secret) as JwtPayload;
      const user = await this.userModel.findOne({ where: { id: findId }, include: { all: true } });
      return user;
    } catch (error) {
      console.error(error);

    }
  }

  async refreshToken(refresh: string) {
    try {
      const user = await this.userModel.findOne({ where: { refresh_token: refresh }, include: { all: true } })
      const updateToken = await this.createToken(user.id)
      return { access_token: updateToken.access_token, refresh_token: updateToken.refresh_token }
    } catch (error) {
      console.error(error);
    }
  }



}

