const socket = io();

let user;
const chatbox = document.getElementById("chatbox");
let log = document.getElementById("log");

socket.on("allMessages", (messages) => {
  messages.forEach((message) => {
    log.innerHTML += `<p>${message.email} dice ${message.message}</p>`;
  });
});

window.addEventListener("DOMContentLoaded", () => {
  Swal.fire({
    title: "Identificate!",
    text: "Ingrese su nombre de usuario",
    input: "text",
    inputValidator: (value) => {
      return !value && "Necesitas escribir un nombre para continuar";
    },
    confirmButtonText: "OK",
  }).then((result) => {
    user = result.value;
    socket.emit("auth", user);
  });
});

chatbox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (chatbox.value.trim().length > 0) {
      socket.emit("message", { email: user, message: chatbox.value });
      chatbox.value = "";
    }
  }
});

socket.on("messageLogs", (data) => {
  log.innerHTML += `${data.email} dice ${data.message} <br>`;
});
