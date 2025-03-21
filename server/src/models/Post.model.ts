import { Table, Column, Model, DataType, PrimaryKey, Default, CreatedAt, ForeignKey, BelongsTo, BeforeCreate, AllowNull, HasMany } from "sequelize-typescript";
import User from "./User.model";
import Chat from "./Chat.model";
import {  ChatListElement } from "../types";

@Table({
    tableName: "posts",
})

class Post extends Model {


    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID
    })
    id!: string;


    @Column({
        type: DataType.STRING(100), allowNull: false
    })
    category!: string

    @Column({
        type: DataType.INTEGER, allowNull: false
    })
    duration!: number

    @Column({
        type: DataType.STRING(100), allowNull: false
    })
    title!: string

    @Column({
        type: DataType.STRING(100), allowNull: false
    })
    description!: string


    @Column({
        type: DataType.STRING(255), allowNull: false
    })
    picture: string


    @Column({
        type: DataType.ARRAY(DataType.FLOAT), allowNull: false
    })
    coordinates: number[]


    @CreatedAt
    @Column({
        type: DataType.DATE, allowNull: false
    })
    createdAt: Date


    @Column({
        type: DataType.DATE, allowNull: true
    })
    destroyAt: Date
    
    @Column({
        type: DataType.JSONB, allowNull: false, defaultValue: []
    })
    chatList: ChatListElement[]

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    isActive!: boolean;


    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID, allowNull: false
    })
    userId!: string;

    @BelongsTo(() => User)
    user!: User;


    @HasMany(() => Chat, {
        foreignKey: 'postId',
        onDelete: 'CASCADE',
        hooks: true,
    })
    chats!: Chat



    //logic to create the destroyAt property
    @BeforeCreate
    static setDestroyAt(post: Post) {
        const extraTimeMs = post.duration * 60 * 1000;

        const baseDate = new Date().getTime();

        const destroyAt = new Date(baseDate + extraTimeMs);
        post.setDataValue('destroyAt', destroyAt);
    }




}

export default Post;