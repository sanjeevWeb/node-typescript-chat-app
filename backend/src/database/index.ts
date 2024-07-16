import { Sequelize } from "sequelize-typescript";
import { config, dialect } from "../config/db.config";


// Importing models
import User from "../models/user.model";
import Message from "../models/message.model";
import Chat from "../models/chat.model";
import Group from "../models/group.model";
import GroupMember from "../models/groupMember.model";
import GroupMessage from "../models/groupMessage.model";
import Media from "../models/media.model";



class Database {
    public sequelize: Sequelize;

    constructor() {
        this.sequelize = new Sequelize({
            database: config.DB,
            username: config.USER,
            password: config.PASSWORD,
            host: config.HOST,
            dialect: dialect,
            pool: {
                max: config.pool.max,
                min: config.pool.min,
                acquire: config.pool.acquire,
                idle: config.pool.idle
            },
            models: [User, Message, Media, Chat, Group, GroupMember, GroupMessage] // Register models
        });

        this.connectToDatabase();
        this.defineAssociations();
    }

    private async connectToDatabase() {
        await this.sequelize
            .authenticate()
            .then(() => {
                console.log("Connection has been established successfully.");
            })
            .catch((err) => {
                console.error("Unable to connect to the Database:", err);
            });

        await this.sequelize.sync({ alter: true }); // Sync models with database
    }

    private defineAssociations() {
        // User has many messages (one-to-many)
        User.hasMany(Message, { foreignKey: 'senderId' });
        Message.belongsTo(User, { foreignKey: 'senderId' });

        // User belongs to many Chats (many-to-many)
        User.belongsToMany(User, { through: Chat, as: 'Chats', foreignKey: 'user1Id', otherKey: 'user2Id' });

        // Message belongs to a Chat (one-to-many)
        Chat.hasMany(Message, { foreignKey: 'chatId' });
        Message.belongsTo(Chat, { foreignKey: 'chatId' });

        // Message has one Media (one-to-one)
        Message.hasOne(Media, { foreignKey: 'messageId' });
        Media.belongsTo(Message, { foreignKey: 'messageId' });

        // Group has many GroupMembers (one-to-many)
        Group.hasMany(GroupMember, { foreignKey: 'groupId' });
        GroupMember.belongsTo(Group, { foreignKey: 'groupId' });

        // Group has many GroupMessages (one-to-many)
        Group.hasMany(GroupMessage, { foreignKey: 'groupId' });
        GroupMessage.belongsTo(Group, { foreignKey: 'groupId' });

        // User has many GroupMessages (one-to-many)
        User.hasMany(GroupMessage, { foreignKey: 'senderId' });
        GroupMessage.belongsTo(User, { foreignKey: 'senderId' });

        // User belongs to many Groups (many-to-many)
        User.belongsToMany(Group, { through: GroupMember, foreignKey: 'userId' });
        Group.belongsToMany(User, { through: GroupMember, foreignKey: 'groupId' });
    }
}

export default Database;
