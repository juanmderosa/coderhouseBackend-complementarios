import { Router } from "express";
import { productManager } from "../dao/services/productManager.js";
import { messageManager } from "../dao/services/messageManager.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allProducts = await productManager.getProducts();
    console.log(allProducts);
    res.render("home", { products: allProducts });
  } catch (error) {
    console.error("Error al cargar la página:", error);
    res.status(500).send("Error al cargar la página");
  }
});

router.get("/chat", async (req, res) => {
  try {
    const allMessages = await messageManager.getMessages();
    res.render("chat", { messages: allMessages });
  } catch (error) {
    console.error("Error al cargar la página de chat:", error);
    res.status(500).send("Error al cargar la página de chat");
  }
});

router.get("/realtimeproducts", async (req, res) => {
  const allProducts = await productManager.getProducts();
  res.render("realtimeproducts", { productos: allProducts });
});

export default router;
