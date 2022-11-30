const express = require('express')
const { conversationSchema, getAllConversations, getAllMessagesByConversationId } = require('../controllers/conversation.controller')
const router = express.Router()

router.post('/', (req, res, next) => {
    conversationSchema(req, res, next)
})

router.get('/', (req, res, next) => {
    getAllConversations(req, res, next)
})

router.get('/messages/:id', (req, res, next) => {
    getAllMessagesByConversationId(req, res, next)
})

module.exports = router;