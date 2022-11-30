const socket = require('../common/socket');
const conversationSchema = require('../models/conversation.model');
const messageSchema = require('../models/message.model');

exports.conversationSchema = async (req, res, next) => {
    if(req.body.conversation_id){
        const message = new messageSchema({
            ...req.body,
            sender_id: req.user._id
        })
        try {
            const messageSaved = await message.save()
            let connection = socket.connection();
            if(connection?.socket){
              connection.socket.to(req.body.conversation_id).emit('recieve-msg', messageSaved);
            }
            res.status(201).json(messageSaved)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
    else {
        const conversationModel = new conversationSchema({
            ...req.body
        })
        try {
            const conversation = await conversationModel.save()
            // res.status(201).json(conversation)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }

        req.body.conversation_id = conversationModel._id;

        const message = new messageSchema({
            ...req.body
        })
        try {
            const messageSaved = await message.save()
            res.status(201).json(messageSaved)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}

exports.getAllConversations = async (req, res, next) => {
    try {
        const conversation = await conversationSchema.find()
        .or([{ user1_id: req.user._id}, {user2_id: req.user._id}])
        .populate({ path: "user1_id", match: { _id: { $ne : req.user._id }}})
        .populate({ path: "user2_id", match: { _id: { $ne : req.user._id }}});
        res.status(200).json(conversation)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.getAllMessagesByConversationId = async (req, res, next) => {
    
    try {
        const message = await messageSchema.find({ conversation_id: req.params.id});
        res.status(200).json(message)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

