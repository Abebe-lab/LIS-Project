import webpush from "web-push";
const { sendNotification: sendNotification } = webpush;

webpush.setVapidDetails(
  "mailto:assefa.samuel@gmail.com",
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);
const subscriptions = []; //temporary use db

const subscribe = async (req, res) => {
  console.log("api: subscription started");
  try {
    const subscription = req.body;
    console.log(subscription);
    //send 201 - resource created
    res.status(201).json({ message: "Subscription received successfully." });
    //payload
    const payload = JSON.stringify({
      title: "IPDC-LIS Welcome",
      body: "Thank you for subscribing!",
    });
    //PAss object to send notification
    webpush.sendNotification(subscription, payload).catch((error) => {
      console.error("Error sending notification:", error);
    });
  } catch (error) {
    console.log(error);
  }
  console.log("api: subscription finished");
};
const notify = async (req, res) => {
  console.log("api: subscription started");
  try {
    const { title, body } = req.body;
    const payload = JSON.stringify({ title, body });

    subscriptions.forEach((subscription) => {
      webpush.sendNotification(subscription, payload).catch((error) => {
        console.error("Error sending notification:", error);
      });
    });

    res.status(200).json({ message: "Notifications sent." });
  } catch (error) {
    console.log(error);
  }
  console.log("api: subscription finished");
};

export default { subscribe, notify };
