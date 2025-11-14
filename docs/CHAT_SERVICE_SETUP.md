# Chat Service Setup Guide

## Overview

The Chat Service provides real-time messaging using Socket.io WebSockets.

## Features

- ✅ Real-time message delivery
- ✅ Typing indicators
- ✅ User presence (online/offline)
- ✅ Channel-based messaging
- ✅ Message history
- ✅ Message editing and deletion

---

## Architecture

```
Frontend (Socket.io Client) ↔ Chat Service (Socket.io Server) ↔ Supabase Database
```

---

## Setup Steps

### 1. Start the Chat Service

```bash
cd /Users/zachschultz/Desktop/Concinnity/Code/Dev/useconcinnity
pnpm --filter=@concinnity/chat-service dev
```

The service will run on:
- **HTTP**: http://localhost:4003
- **WebSocket**: ws://localhost:4003

### 2. Test the Service

**Health Check**:
```bash
curl http://localhost:4003/api/v1/health
```

**API Documentation**:
Open http://localhost:4003/api/docs in your browser

---

## Socket.io Events

### Client → Server

#### 1. Join Channel
```javascript
socket.emit('join_channel', {
  channelId: 'channel-id',
  userId: 'user-id'
});
```

#### 2. Leave Channel
```javascript
socket.emit('leave_channel', {
  channelId: 'channel-id',
  userId: 'user-id'
});
```

#### 3. Send Message
```javascript
socket.emit('send_message', {
  channelId: 'channel-id',
  userId: 'user-id',
  content: 'Hello, world!'
});
```

#### 4. Typing Indicator
```javascript
socket.emit('typing', {
  channelId: 'channel-id',
  userId: 'user-id',
  userName: 'John Doe'
});
```

#### 5. Stop Typing
```javascript
socket.emit('stop_typing', {
  channelId: 'channel-id',
  userId: 'user-id'
});
```

### Server → Client

#### 1. New Message
```javascript
socket.on('new_message', (data) => {
  console.log('New message:', data);
  // data: { id, channelId, userId, content, createdAt, user }
});
```

#### 2. User Joined
```javascript
socket.on('user_joined', (data) => {
  console.log('User joined:', data);
  // data: { channelId, userId, timestamp }
});
```

#### 3. User Left
```javascript
socket.on('user_left', (data) => {
  console.log('User left:', data);
  // data: { channelId, userId, timestamp }
});
```

#### 4. User Typing
```javascript
socket.on('user_typing', (data) => {
  console.log('User typing:', data);
  // data: { channelId, userId, userName, timestamp }
});
```

#### 5. User Stop Typing
```javascript
socket.on('user_stop_typing', (data) => {
  console.log('User stopped typing:', data);
  // data: { channelId, userId, timestamp }
});
```

---

## Frontend Integration

### Install Socket.io Client

```bash
pnpm add socket.io-client --filter=web
```

### Example React Hook

```typescript
// hooks/useChat.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export function useChat(channelId: string, userId: string) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connect to chat service
    const newSocket = io('http://localhost:4003');

    newSocket.on('connect', () => {
      setIsConnected(true);
      // Join channel
      newSocket.emit('join_channel', { channelId, userId });
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    newSocket.on('new_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.emit('leave_channel', { channelId, userId });
      newSocket.close();
    };
  }, [channelId, userId]);

  const sendMessage = (content: string) => {
    if (socket && isConnected) {
      socket.emit('send_message', { channelId, userId, content });
    }
  };

  return { socket, messages, isConnected, sendMessage };
}
```

---

## Database Schema

Messages are stored in the `messages` table:

```prisma
model Message {
  id        String   @id @default(cuid())
  content   String
  channelId String
  userId    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  channel   Channel @relation(...)
  user      User    @relation(...)
}
```

---

## API Endpoints (REST)

The Chat Service also provides REST endpoints for message history:

### Get Channel Messages
```
GET /api/v1/messages/:channelId?limit=50&offset=0
```

### Get Single Message
```
GET /api/v1/messages/:messageId
```

### Delete Message
```
DELETE /api/v1/messages/:messageId
```

### Update Message
```
PATCH /api/v1/messages/:messageId
Body: { content: "Updated message" }
```

---

## Next Steps

1. ✅ Create chat UI components
2. ✅ Implement typing indicators
3. ✅ Add message reactions
4. ✅ Add file uploads
5. ✅ Add message search

---

## Production Deployment

Deploy to Railway, Render, or Fly.io with WebSocket support enabled.

**Important**: Make sure to configure CORS properly for production:

```env
FRONTEND_URL=https://your-production-domain.com
```

