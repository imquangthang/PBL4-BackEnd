// socket.js
export default function initSocket(io) {
  io.on("connection", (socket) => {
    console.log("🔌 Client connected:", socket.id);

    // Nhận và broadcast tin nhắn
    socket.on("send_message", (data) => {
      console.log("📩 Message received:", data);
      io.emit("receive_message", data); // gửi lại cho tất cả clients
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });
}
