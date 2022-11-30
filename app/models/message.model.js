const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
    {
      message: String,
      sender_id: { type: Schema.Types.ObjectId, ref: 'users'},
      conversation_id: { type: Schema.Types.ObjectId, ref: 'conversation'}
    },
    {
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
    }
  );


module.exports = mongoose.model("message", messageSchema);
