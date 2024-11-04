/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './app.model';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: `.env`
  }), SequelizeModule.forRoot({
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRESS_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRESS_PASSWORD,
    database: process.env.POSTGRES_DB,
    models: [User],
    autoLoadModels: true
  }), SequelizeModule.forFeature([User])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
