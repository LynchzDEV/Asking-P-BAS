#!/bin/sh

# Function to handle shutdown
shutdown() {
    echo "Shutting down services..."
    kill $SOCKET_PID $NEXT_PID
    wait $SOCKET_PID $NEXT_PID
    exit 0
}

# Trap signals for graceful shutdown
trap shutdown SIGTERM SIGINT

# Start Socket.IO server in the background
echo "Starting Socket.IO server on port 3001..."
node server.js &
SOCKET_PID=$!

# Start Next.js server in the background
echo "Starting Next.js server on port 3000..."
node server.js &
NEXT_PID=$!

# Wait for all background processes
wait $SOCKET_PID $NEXT_PID