import { Table, Column, Model, DataType, PrimaryKey, Default, CreatedAt, ForeignKey, BelongsTo, BeforeCreate, AllowNull } from "sequelize-typescript";
import User from "./User.model";
import Post from "./Post.model";
import { Context, Message } from "../types";



@Table({
    tableName: "chats",
})

class Chat extends Model {


    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID
    })
    id!: string

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID, allowNull: false
    })
    ownerId!: string
    
    @BelongsTo(() => User, { foreignKey: "ownerId" })
    owner!: User;
    
    
    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID, allowNull: false
    })
    notOwnerId!: string

    @BelongsTo(() => User, { foreignKey: "notOwnerId" })
    notOwner!: User;

   
    @Column({
        type: DataType.JSONB, allowNull: false
    })
    context!: Context


    @Column({
        type: DataType.JSONB, allowNull: false
    })
    messages: Message[]

    
    @ForeignKey(() => Post)
    @Column({
        type: DataType.UUID, allowNull: false
    })
    postId!: string


    @BelongsTo(()=>Post)
    post!: Post



}

export default Chat;