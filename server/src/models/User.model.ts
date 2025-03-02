import { Table, Column, Model, DataType, PrimaryKey, Default, CreatedAt, HasMany, HasOne } from "sequelize-typescript";
import Post from "./Post.model";
import { NonAttribute } from "sequelize";

@Table({
    tableName: "users",
    timestamps: true,
    createdAt: true
})

class User extends Model {


    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID
    })
    id: string;

    @Column({
        type: DataType.STRING(100), allowNull: false
    })
    name: string

    @Column({
        type: DataType.STRING(100), allowNull: false, unique: true

    })
    userName: string

    @Column({
        type: DataType.STRING(100), allowNull: false, unique: true
    })
    email: string

    @Column({
        type: DataType.STRING(100), allowNull: false
    })
    password: string

    @Column({
        type: DataType.STRING(100), allowNull: false
    })
    city: string

    @Column({
        type: DataType.STRING(255), allowNull: false
    })
    profilePicture: string
    
    @CreatedAt
    @Column({
        type: DataType.DATE, allowNull: false
    })
    createdAt: Date
    
    @HasMany(() => Post, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        hooks: true,
    })
    post: Post


}

export default User;