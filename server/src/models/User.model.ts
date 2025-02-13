import { Table, Column, Model, DataType, PrimaryKey, Default} from "sequelize-typescript";

@Table({
    tableName: 'users'
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
        type: DataType.STRING(100)
    })
    userName: string

    @Column({
        type: DataType.STRING(100)
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
        type: DataType.STRING(100)
    })
    profilePicture: string


}

export default User;