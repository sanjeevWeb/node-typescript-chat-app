import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Message from './message.model';

@Table({ tableName: 'media' })
class Media extends Model<Media> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey:true })
    id!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    type!: string; // 'image' or 'video'

    @Column({ type: DataType.STRING, allowNull: false })
    url!: string;

    @ForeignKey(() => Message)
    @Column({ type: DataType.UUID, allowNull: false })
    messageId!: string;

    @BelongsTo(() => Message, 'messageId')
    message!: Message;
}

export default Media
