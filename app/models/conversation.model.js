const mongoose = require("mongoose");
const { Schema } = mongoose;

const conversationSchema = new Schema(
  {
    user1_id: { type: Schema.Types.ObjectId, ref: 'users'},
    user2_id: { type: Schema.Types.ObjectId, ref: 'users'}
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("conversation", conversationSchema);
