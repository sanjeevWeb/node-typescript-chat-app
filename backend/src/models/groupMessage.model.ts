import { Model, Table, Column, DataType, ForeignKey, BelongsTo, PrimaryKey } from 'sequelize-typescript';
import User from './user.model';
import Group from './group.model';

@Table({ tableName: 'group_messages' })
class GroupMessage extends Model<GroupMessage> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
    id!: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    content!: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, allowNull: false })
    senderId!: string;

    @ForeignKey(() => Group)
    @Column({ type: DataType.UUID, allowNull: false })
    groupId!: string;

    @BelongsTo(() => User, 'senderId')
    sender!: User;

    @BelongsTo(() => Group, 'groupId')
    group!: Group;
}

export default GroupMessage
