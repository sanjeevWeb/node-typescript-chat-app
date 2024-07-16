import { Model, Table, Column, DataType, PrimaryKey } from 'sequelize-typescript';

@Table({ tableName: 'groups' })
class Group extends Model<Group> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
    id!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @Column({ type: DataType.TEXT })
    description?: string;
}

export default Group
