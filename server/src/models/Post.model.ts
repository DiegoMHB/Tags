import { Table, Column, Model, DataType, PrimaryKey, Default, CreatedAt, ForeignKey, BelongsTo, BeforeCreate } from "sequelize-typescript";
import User from "./User.model";

@Table({
    tableName: "posts",
    timestamps: true,
})

class Post extends Model {


    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID
    })
    id: string;

    @Column({
        type: DataType.STRING(100), allowNull: false
    })
    need: string

    @Column({
        type: DataType.STRING(100), allowNull: false
    })
    category: string

    @Column({
        type: DataType.INTEGER, allowNull: false
    })
    duration: number

    @Column({
        type: DataType.STRING(100), allowNull: false
    })
    title: string

    @Column({
        type: DataType.STRING(100), allowNull: false
    })
    description: string

    @Column({
        type: DataType.STRING(100), allowNull: false
    })
    picture: string

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID, allowNull: false,
    })
    userId!: string;

    @Column({
        type: DataType.DOUBLE, //allowNull: false
    })
    coordinate0: number

    @Column({
        type: DataType.DOUBLE, //allowNull: false
    })
    coordinate1: number

    
    @CreatedAt
    @Column({
        type: DataType.DATE, allowNull: false
    })
    createdAt: Date
    
    @Column({
        type: DataType.DATE,// allowNull: false
    })
    destroyAt: Date
    
    
    
    @BelongsTo(() => User)
    user!: User;
    
    
    coordinates: number[]; //so its part of the instance 
    //logic to create the destroyAt property
    @BeforeCreate
    static setDestroyAt(post: Post) {
        const extraTimeMs = post.duration * 60 * 1000;

        const baseDate = new Date().getTime();

        const destroyAt = new Date(baseDate + extraTimeMs);
        post.destroyAt = destroyAt
    }

    @BeforeCreate
    static setCoordinates(post: Post) {
        console.log('POST---------->',post)
        const coord = (post).coordinates;
        console.log('Coordenadas recibidas:', coord);
        post.coordinate0 = +coord[0];
        post.coordinate1 = +coord[1];

    }

}

export default Post;