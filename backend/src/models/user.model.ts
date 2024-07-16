import { Model, Table, Column, DataType, PrimaryKey } from 'sequelize-typescript';

@Table({ tableName: 'users' })
class User extends Model<User> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
    id!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    username!: string;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password!: string;
    
    @Column({ type: DataType.STRING, allowNull: false })
    phone!: string;

}

export default User
