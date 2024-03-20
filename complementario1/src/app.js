import express from "express";
import { productRouter } from "./routes/productRoutes.js";
import { cartRouter } from "./routes/cartRoutes.js";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewRouter from "./routes/views.router.js";
import mongoose from "mongoose";
import { messageRouter } from "./routes/chatRoutes.js";
import { messageManager } from "./dao/services/messageManager.js";
import { productManager } from "./dao/services/productManager.js";

const PORT = process.env.PORT | 8080;
const app = express();
//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.engine("handlebars", handlebars.engine());
app.use(viewRouter);

const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://juanmderosa:sGD3FNfTmzJ0dlNS@cluster0.mo9zqch.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Conectado con MongoDB");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

connectMongoDB();

//Listen
const server = app.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto ${PORT}`);
});

const io = new Server(server);

//Routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/chats", messageRouter);

io.removeAllListeners();
io.on("connection", async (socket) => {
  const allMessages = await messageManager.getMessages();
  socket.emit("allMessages", allMessages);
  socket.on("auth", (user) => {
    socket.user = user;
  });
  socket.on("message", async (data) => {
    try {
      const messageData = { ...data, email: socket.user };
      await messageManager.createMessage(messageData);
      console.log("data", messageData);
      io.emit("messageLogs", messageData);
    } catch (error) {
      console.error("Error al guardar el mensaje:", error);
      socket.emit("error", { message: "Error al guardar el mensaje" });
    }
  });
  socket.on("getProducts", async () => {
    const allProducts = await productManager.getProducts();
    io.emit("updateProducts", allProducts);
  });

  socket.on("addProduct", async (newProduct) => {
    try {
      await productManager.addProducts(newProduct);
      const allProducts = await productManager.getProducts();
      io.emit("updateProducts", allProducts);
    } catch (error) {
      console.error("Error al agregar el producto:", error.message);
    }
  });
});
