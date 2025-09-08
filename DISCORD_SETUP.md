# Discord Webhook Setup for Asking Card

This guide will help you set up Discord notifications for when new cards are created. The bot will appear as "พี่บาสครับผมมีคำถาม" and will notify about both text and file submissions.

## Step 1: Create a Discord Webhook

1. **Open your Discord server** where you want to receive notifications
2. **Go to Server Settings** (click the server name → Server Settings)
3. **Navigate to Integrations** in the left sidebar
4. **Click on "Webhooks"**
5. **Click "Create Webhook"**
6. **Configure your webhook:**
   - **Name:** Asking Card Bot (or any name you prefer)
   - **Channel:** Choose the channel where notifications should appear
   - **Avatar:** Optional - you can upload a custom image
7. **Copy the Webhook URL** - you'll need this for the next step

## Step 2: Configure Environment Variables

1. **Open the `.env.local` file** in your project root
2. **Replace `your_discord_webhook_url_here`** with your actual webhook URL:

```env
# Discord Webhook Configuration
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_URL_HERE
DISCORD_NOTIFICATIONS_ENABLED=true
```

## Step 3: Test the Integration

1. **Start your servers:**
   ```bash
   npm run server  # Terminal 1
   npm run dev     # Terminal 2
   ```

2. **Create a test card** in your application
3. **Check your Discord channel** - you should see a notification with:
   - Card topic
   - Card description
   - Timestamp
   - Asking Card branding

## Notification Features

The Discord notifications include:
- ✨ **Rich embed format** with clean styling
- 📝 **Card topic and description** 
- 📎 **File attachment info** (filename and size when files are uploaded)
- ⏰ **Timestamp** when the card was created
- 🎨 **Black color theme** matching your app
- 🤖 **Thai bot name** ("พี่บาสครับผมมีคำถาม")
- 💬 **Custom footer message** in Thai

## Troubleshooting

### Notifications not appearing?
1. Check that `DISCORD_NOTIFICATIONS_ENABLED=true` in `.env.local`
2. Verify your webhook URL is correct and complete
3. Check the server console for error messages
4. Ensure the webhook hasn't been deleted from Discord

### Server console messages:
- ✅ `Discord notification sent successfully` - Working correctly
- ⚠️ `Discord notifications disabled or webhook URL not configured` - Check your environment variables
- ❌ `Failed to send Discord notification: [error]` - Check webhook URL and Discord server permissions

## Disabling Notifications

To temporarily disable Discord notifications without removing the webhook URL:

```env
DISCORD_NOTIFICATIONS_ENABLED=false
```

The application will continue working normally, just without Discord notifications.