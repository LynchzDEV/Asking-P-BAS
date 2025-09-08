const { createServer } = require("http");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const next = require("next");
require("dotenv").config({ path: ".env.local" });

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

// Initialize Next.js
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Discord notification function
async function sendDiscordNotification(card) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  const notificationsEnabled =
    process.env.DISCORD_NOTIFICATIONS_ENABLED === "true";

  if (!webhookUrl || !notificationsEnabled) {
    console.log("Discord notifications disabled or webhook URL not configured");
    return;
  }

  try {
    const fields = [
      {
        name: "Topic",
        value: card.topic,
        inline: false,
      },
      {
        name: "Description",
        value:
          card.description.length > 1024
            ? card.description.substring(0, 1021) + "..."
            : card.description,
        inline: false,
      },
    ];

    // Add file information if present
    if (card.file) {
      const fileSize = card.file.size;
      const formattedSize =
        fileSize < 1024
          ? `${fileSize} bytes`
          : fileSize < 1024 * 1024
            ? `${(fileSize / 1024).toFixed(1)} KB`
            : `${(fileSize / (1024 * 1024)).toFixed(1)} MB`;

      fields.push({
        name: "📎 File Attachment",
        value: `**${card.file.name}** (${formattedSize})`,
        inline: false,
      });
    }

    const embed = {
      title: "📝 New Asking Card Created!",
      color: 0x000000,
      fields,
      timestamp: card.createdAt,
      footer: {
        text: "asking.lynchz.dev • ผมถามพี่บาสเมื่อไร อยากให้พี่บาสตอบผมเมื่อไหร่ก็ได้เช่นกัน",
      },
    };

    await axios.post(webhookUrl, {
      embeds: [embed],
      username: "พี่บาสครับผมมีคำถาม",
    });

    console.log("✅ Discord notification sent successfully");
  } catch (error) {
    console.error("❌ Failed to send Discord notification:", error.message);
  }
}

// In-memory storage for cards
let cards = [
  {
    id: uuidv4(),
    topic: "Welcome to Asking Card",
    description:
      "This is your first card. Create more by filling out the form below.",
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    topic: "Real-time Updates",
    description:
      "All cards update in real-time across all connected users thanks to Socket.IO.",
    createdAt: new Date().toISOString(),
  },
];

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      await handle(req, res);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  });

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Send existing cards to newly connected client
    socket.emit("initial_cards", cards);

    // Handle new card creation
    socket.on("create_card", async (cardData) => {
      const newCard = {
        id: uuidv4(),
        topic: cardData.topic,
        description: cardData.description,
        file: cardData.file || undefined,
        createdAt: new Date().toISOString(),
      };

      // Add to in-memory storage
      cards.unshift(newCard);

      // Broadcast to all connected clients
      io.emit("new_card", newCard);

      // Send Discord notification
      await sendDiscordNotification(newCard);

      console.log("New card created:", newCard.topic);
    });

    // Handle card deletion
    socket.on("delete_card", (cardId) => {
      const cardIndex = cards.findIndex((card) => card.id === cardId);
      if (cardIndex !== -1) {
        const deletedCard = cards.splice(cardIndex, 1)[0];
        io.emit("card_deleted", cardId);
        console.log("Card deleted:", deletedCard.topic);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  httpServer.listen(port, () => {
    console.log(`🚀 Server ready at http://${hostname}:${port}`);
    console.log(`📡 Socket.IO server running on the same port`);
  });
});