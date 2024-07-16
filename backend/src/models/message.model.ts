import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './user.model';
import Chat from './chat.model';

@Table({ tableName: 'messages' })
class Message extends Model<Message> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
    id!: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    content!: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, allowNull: false })
    senderId!: string;

    @ForeignKey(() => Chat)
    @Column({ type: DataType.UUID, allowNull: false })
    chatId!: string;

    @BelongsTo(() => User, 'senderId')
    sender!: User;

    @BelongsTo(() => Chat, 'chatId')
    chat!: Chat;
}

export default Message
