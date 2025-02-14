import { Table, Column, Model, DataType, PrimaryKey, Default, CreatedAt } from "sequelize-typescript";

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
        type: DataType.STRING(100)
    })
    name: string

    @Column({
        type: DataType.STRING(100),
        unique: true

    })
    userName: string

    @Column({
        type: DataType.STRING(100),
        unique: true
    })
    email: string

    @Column({
        type: DataType.STRING(100)
    })
    password: string

    @Column({
        type: DataType.STRING(100)
    })
    city: string

    @Column({
        type: DataType.STRING(255)
    })
    profilePicture: string

    @CreatedAt
    @Column({
        type: DataType.DATE
    })
    createdAt: Date



}

export default User;