const Messages = require("../models/Message");
module.exports.addMsg = async (req, res, next) => {
  try {
    console.log("reached");
    const { from, to, message } = req.body;
    console.log(from, to);
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) return res.json({ msg: "Message added Successfully" });
    return res.json({ msg: "Failed to add message to the database" });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllMsg = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    console.log(messages);
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        messages: msg.message.text
      };
    });
    return res.json(projectedMessages);
  } catch (err) {
    next(err);
  }
};
