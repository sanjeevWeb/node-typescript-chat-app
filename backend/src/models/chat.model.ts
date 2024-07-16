import { Model, DataType, ForeignKey, BelongsTo, Table, Column, PrimaryKey } from 'sequelize-typescript'
import User from './user.model';

@Table({ tableName: 'chats'})
class Chat extends Model<Chat>{
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey:true })
    id!: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, allowNull: false })
    user1Id!: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, allowNull: false })
    user2Id!: string;

    @BelongsTo(() => User, 'user1Id')
    user1!: User;

    @BelongsTo(() => User, 'user2Id')
    user2!: User;
}

export default Chat;