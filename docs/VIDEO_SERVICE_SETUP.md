# Video Service Setup Guide

This guide will help you set up the Video Service with Dyte integration for Concinnity.

## Prerequisites

1. **Dyte Account**: Sign up at https://dyte.io
2. **Dyte API Keys**: Get your Organization ID and API Key from the Dyte dashboard

## Getting Dyte API Keys

### Step 1: Create a Dyte Account

1. Go to https://dyte.io
2. Click "Get Started" or "Sign Up"
3. Complete the registration process

### Step 2: Get Your API Keys

1. Log in to the Dyte Dashboard: https://dev.dyte.io
2. Navigate to **API Keys** in the left sidebar
3. You'll see two important values:
   - **Organization ID**: Your unique org identifier (e.g., `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)
   - **API Key**: Your secret API key (e.g., `dyte_api_key_xxxxxxxxxxxxx`)

### Step 3: Configure Environment Variables

#### Video Service (.env)

Create `services/video/.env`:

```env
# Service Configuration
PORT=4002
NODE_ENV=development

# Dyte Configuration
DYTE_ORG_ID=your_dyte_org_id_here
DYTE_API_KEY=your_dyte_api_key_here

# Database
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1&connect_timeout=10"
DIRECT_URL="postgresql://postgres:YOUR_PASSWORD@aws-0-us-west-2.pooler.supabase.com:5432/postgres?connect_timeout=30"

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://nqyudbywjkyydhiltcho.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Clerk
CLERK_SECRET_KEY=your_clerk_secret_key
```

#### Frontend (.env.local)

Add to `apps/web/.env.local`:

```env
# Existing variables...

# Video Service
NEXT_PUBLIC_VIDEO_SERVICE_URL=http://localhost:4002
```

## Database Migration

Update your database schema to include Dyte fields:

```bash
# Generate Prisma client with new schema
pnpm --filter=@concinnity/database db:generate

# Push schema changes to database
pnpm --filter=@concinnity/database db:push
```

## Running the Video Service

### Start the Service

```bash
# From the root directory
pnpm --filter=@concinnity/video-service dev

# Or navigate to the service directory
cd services/video
pnpm dev
```

The service will start on **http://localhost:4002**

### Verify the Service

1. **Health Check**: http://localhost:4002/api/v1/health
2. **API Documentation**: http://localhost:4002/api/docs

## Using Video Calls in Your App

### 1. Create a Meeting

```typescript
const response = await fetch('http://localhost:4002/api/v1/meetings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Team Standup',
    organizationId: 'org_123',
    scheduledAt: new Date().toISOString(),
    duration: 30,
    recordOnStart: false,
  }),
});

const meeting = await response.json();
```

### 2. Join a Meeting

```typescript
const response = await fetch('http://localhost:4002/api/v1/meetings/join', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    meetingId: 'meeting_123',
    userId: 'user_123',
    userName: 'John Doe',
    userPicture: 'https://example.com/avatar.jpg',
  }),
});

const { authToken, dyteRoomId } = await response.json();
```

### 3. Use the VideoCall Component

```tsx
import { VideoCall } from '@/components/video/VideoCall';

function MeetingPage() {
  return <VideoCall meetingId="meeting_123" onLeave={() => router.push('/dashboard')} />;
}
```

### 4. Use the CreateMeetingButton Component

```tsx
import { CreateMeetingButton } from '@/components/video/CreateMeetingButton';

function Dashboard() {
  return (
    <CreateMeetingButton
      organizationId="org_123"
      onMeetingCreated={(meetingId) => router.push(`/meeting/${meetingId}`)}
    />
  );
}
```

## API Endpoints

### Create Meeting
- **POST** `/api/v1/meetings`
- **Body**: `{ title, organizationId, channelId?, scheduledAt?, duration?, recordOnStart? }`

### Join Meeting
- **POST** `/api/v1/meetings/join`
- **Body**: `{ meetingId, userId, userName, userPicture? }`

### Get Meeting
- **GET** `/api/v1/meetings/:id`

### End Meeting
- **POST** `/api/v1/meetings/:id/end`

## Dyte Features

The integration includes:

- ✅ **Video & Audio**: HD video and crystal-clear audio
- ✅ **Screen Sharing**: Share your screen with participants
- ✅ **Chat**: In-meeting text chat
- ✅ **Recording**: Record meetings (when enabled)
- ✅ **Participant Management**: Add/remove participants
- ✅ **Waiting Room**: Control who joins the meeting
- ✅ **Breakout Rooms**: Split into smaller groups
- ✅ **Polls**: Create polls during meetings
- ✅ **Plugins**: Extend functionality with Dyte plugins

## Troubleshooting

### "API key is required" Error

Make sure you've set `DYTE_ORG_ID` and `DYTE_API_KEY` in your `.env` file.

### Video Not Loading

1. Check that the Dyte packages are installed: `@dytesdk/react-ui-kit` and `@dytesdk/web-core`
2. Verify your browser supports WebRTC
3. Check browser console for errors

### Database Connection Issues

Make sure you've run the database migration to add the new Dyte fields.

## Next Steps

1. Customize Dyte presets in the Dyte dashboard
2. Set up recording storage (AWS S3, etc.)
3. Configure webhooks for meeting events
4. Add meeting scheduling UI
5. Implement meeting invitations

## Resources

- [Dyte Documentation](https://docs.dyte.io)
- [Dyte React UI Kit](https://docs.dyte.io/react-ui-kit)
- [Dyte API Reference](https://docs.dyte.io/api)

