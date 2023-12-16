const admin = require("../helper");

const sendToDevice = () => {
  const registrationToken =
    "eFI9FgZ3SB2jZEPzzzKcjw:APA91bGLlhV3URYjEg5AlrUr8YrIpF0ioVarhN5GHLh0fPSDEy52oI__5fXZZ930z7Z2EQj58c5XVRbW5IL2bQB7QQpT1UZSO6IM3KgU8jzioZK9yqJ8V3E-JeQhmu-YS7SIh9Ux15HR";

  admin
    .messaging()
    .send({
      notification: {
        title: "Registration",
        body: "Successfully",
      },
      android: {
        notification: {
          sound: "default",
        },
      },
      apns: {
        payload: {
          aps: {
            sound: "default",
          },
        },
      },
      token: registrationToken,
    })
    .then((res) => console.log(JSON.stringify(res)))
    .catch((err) => console.log(JSON.stringify(err)));

  return "";
};

module.exports = {
  getUsers: async (req, res, next) => {
    try {
      //Push notification
      sendToDevice();
      //Send to client
      res.status(200).send({
        notification: "This is notification",
      });
    } catch (error) {
      console.log(error);
    }
  },
};
