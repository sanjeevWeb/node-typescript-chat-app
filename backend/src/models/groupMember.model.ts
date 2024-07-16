import { Model, Table, Column, DataType, ForeignKey, BelongsTo, PrimaryKey } from 'sequelize-typescript';
import Group from './group.model';
import User from './user.model';

@Table({ tableName: 'group_members' })
class GroupMember extends Model<GroupMember> {
    @Column({ type: DataType.INTEGER, primaryKey: true})

    @ForeignKey(() => Group)
    @Column({ type: DataType.UUID })
    groupId!: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID })
    userId!: string;

    @BelongsTo(() => Group, 'groupId')
    group!: Group;

    @BelongsTo(() => User, 'userId')
    user!: User;
}

export default GroupMember
