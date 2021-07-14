const axios = require("axios");
const crypto = require("crypto");

const telegramToken = process.env.TelegramToken;
const chatID = process.env.ChatID;
const HMACSecret = process.env.HMACSecret;

exports.newDiscourseTopic = (req, res) => {
  if (!telegramToken || !chatID || !HMACSecret) {
    res.status(400).send("process envs not set");
    return;
  }

  // Check the signature
  const signature = req.headers["x-discourse-event-signature"].split("=")[1];
  const hmac = crypto
    .createHmac("sha256", HMACSecret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hmac !== signature) {
    res.status(400).send("invalid HMAC - did you set the secret?");
    return;
  }

  const { topic } = req.body;
  if (topic) {
    const { title, id, visible, posts_count, closed, archetype } = topic;

    if (closed || !visible || posts_count > 1 || archetype !== "regular") {
      res.status(200).send("Not worthy of a notification");
      return;
    }

    axios
      .get(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        params: {
          chat_id: chatID,
          text:
            `✒️ <i>New post on the forum:</i> \n\n` +
            `<b>${title}</b> \n\n` +
            `<a href="https://list.hacman.org.uk/t/${id}"> 🔗 View and reply on the forum</a>`,
          parse_mode: "HTML",
        },
      })
      .then(() => {
        res.status(200).send(telegramToken);
      })
      .catch((e) => {
        res.status(500).send();
      });
  } else {
    res.status(400).send();
  }
};
