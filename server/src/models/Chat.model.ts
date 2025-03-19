import { Table, Column, Model, DataType, PrimaryKey, Default, CreatedAt, ForeignKey, BelongsTo, BeforeCreate, AllowNull } from "sequelize-typescript";
import User from "./User.model";
import Post from "./Post.model";

type Message = {
    owner: boolean,
    date: string,
    content: string,
}

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

    
    @Column({
        type: DataType.UUID, allowNull: false
    })
    ownerId!: string


    @Column({
        type: DataType.UUID, allowNull: false
    })
    notOwnerId!: string
   
    @Column({
        type: DataType.STRING, allowNull: false
    })
    notOwnerUserName!: string


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