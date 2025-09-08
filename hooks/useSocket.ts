"use client";

import { useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { Card, CardFormData, SocketEvents } from "@/types";

interface UseSocketReturn {
  cards: Card[];
  isConnected: boolean;
  createCard: (cardData: CardFormData) => void;
  deleteCard: (cardId: string) => void;
  isSubmitting: boolean;
}

export const useSocket = (): UseSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Determine the socket URL based on environment
    const getSocketUrl = () => {
      if (process.env.NEXT_PUBLIC_SOCKET_URL) {
        return process.env.NEXT_PUBLIC_SOCKET_URL;
      }
      if (typeof window !== "undefined") {
        const protocol = window.location.protocol === "https:" ? "https:" : "http:";
        const hostname = window.location.hostname;
        const port = window.location.port;

        // For production and Docker deployments, use same origin as the app
        if (hostname === "asking.lynchz.dev" || hostname !== "localhost") {
          return `${protocol}//${hostname}${port ? `:${port}` : ""}`;
        }

        // Local development - separate Socket.IO server
        return "http://localhost:3001";
      }
      return "http://localhost:3001";
    };

    const socketInstance = io(getSocketUrl(), {
      transports: ["websocket", "polling"],
      forceNew: true,
    });
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      setIsConnected(true);
      console.log("Connected to Socket.IO server");
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected from Socket.IO server");
    });

    socketInstance.on("initial_cards", (initialCards: Card[]) => {
      setCards(initialCards);
    });

    socketInstance.on("new_card", (newCard: Card) => {
      setCards((prevCards) => [newCard, ...prevCards]);
      setIsSubmitting(false);
    });

    socketInstance.on("card_deleted", (cardId: string) => {
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const createCard = useCallback(
    (cardData: CardFormData) => {
      if (socket && isConnected) {
        setIsSubmitting(true);
        socket.emit("create_card", cardData);
      }
    },
    [socket, isConnected],
  );

  const deleteCard = useCallback(
    (cardId: string) => {
      if (socket && isConnected) {
        socket.emit("delete_card", cardId);
      }
    },
    [socket, isConnected],
  );

  return {
    cards,
    isConnected,
    createCard,
    deleteCard,
    isSubmitting,
  };
};
