const { Server } = require('socket.io');

const io = new Server({ cors: {
    origin : "http://localhost:3000"
}});

let onlineUsers = [];

const addNewUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.id === userId) &&
    onlineUsers.push({ id: userId, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const removeByUsername = (userId) => {
  onlineUsers = onlineUsers.filter((user) => user.id !== userId);
}

const getUser = (userId) => {
  return onlineUsers.find((user) => user.id === userId);
};


io.on("connection", (socket) => {
    socket.on("newUser", (userId) => {
        console.log(userId);
      if(getUser(userId)) {
        removeByUsername(userId);
      }
      addNewUser(userId, socket.id);
      console.log(onlineUsers, socket.id);
    });
  
    socket.on("sendNotification", (data) => {
    //   delete data.pivot.sender;
      console.log(onlineUsers);
      const receiver = getUser(data.receiver_id);
      if (receiver) {
        console.log(receiver);
        io.to(receiver.socketId).emit("getNotification",
          data
        );
      }
    });
  
    //socket.on("sendText", ({ senderName, receiverName, text }) => {
    //  const receiver = getUser(receiverName);
    //  io.to(receiver.socketId).emit("getText", {
    //    senderName,
    //    text,
    //  });
    //});
    socket.on("logout", () => {
      removeUser(socket.id);
      console.log(onlineUsers);
    })
    socket.on("disconnect", () => {
      removeUser(socket.id);
      console.log(onlineUsers);
    });
  });

  
io.listen(5000);