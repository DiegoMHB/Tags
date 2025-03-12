import { Table, Column, Model, DataType, PrimaryKey, Default, CreatedAt, ForeignKey, BelongsTo, BeforeCreate, AllowNull } from "sequelize-typescript";
import User from "./User.model";

type Message = {
    userName: string,
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

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID, allowNull: false
    })
    ownerID!: string

    @BelongsTo(() => User, "ownerID")
    owner!: User;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID, allowNull: false
    })
    notOwnerID!: string

    @BelongsTo(() => User, "notOwnerID")
    notOwner!: User;


    @Column({
        type: DataType.UUID, allowNull: false
    })
    post!: string


    @Column({
        type: DataType.JSONB, allowNull: false
    })
    messages: Message[]


    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    isActive!: boolean;



}

export default Chat;