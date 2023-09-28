const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const forgotPasswordSchema = new Schema({
  id: {
    type: mongoose.Schema.Types.UUID,
    default: mongoose.Types.UUID,
    required: true,
    unique: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  expiresby: {
    type: Date,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const ForgotPassword = mongoose.model("ForgotPassword", forgotPasswordSchema);

module.exports = ForgotPassword;