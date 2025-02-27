import { Table, Column, Model, DataType, PrimaryKey, Default, CreatedAt, ForeignKey, BelongsTo, BeforeCreate, AllowNull } from "sequelize-typescript";
import User from "./User.model";

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


    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID, allowNull: false
    })
    userId!: string;

    @BelongsTo(() => User)
    user!: User;




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