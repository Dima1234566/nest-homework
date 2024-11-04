/* eslint-disable prettier/prettier */

import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface userCreate { id: number, email: string, name: string, password: string }

@Table({
    tableName: 'users'
})
export class User extends Model<User, userCreate> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: true })
    name: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    verify: boolean;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @Column({ type: DataType.STRING, allowNull: true })
    access_token: string;

    @Column({ type: DataType.STRING, allowNull: true })
    refresh_token: string;
}