const Conversation = require("../models/conversation.model.js");
const Message = require("../models/message.model.js");
const { getReceiverSocketId, io } = require("../Socket/Socket.js");

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const id = req.params.id;
    const receiverId = id;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    //    await conversation.save();
    //    await newMessage.save();

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage",newMessage);
    }

    res.status(201).send(newMessage);
  } catch (error) {
    console.log("Error in SendMessage controller :", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.getMessages = async (req, res) => {
  try {

    const {id:userToChatId} = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
        participants: { $all:[senderId,userToChatId]},
    }).populate("messages");

    if(!conversation) return res.status(200).send([]);

    const messages = conversation.messages

    res.status(200).send(messages)

  } catch (error) {
    console.log("Error in SendMessage controller :", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
