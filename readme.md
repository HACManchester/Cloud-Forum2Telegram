# Discourse to Telegram for topics
Fires a notification to Telegram when a new topic is posted to Discourse.

Hosted on your cloud service of choice:
* initially on GCP under the outreach account
* ForumTelegramNotifications is the project name

## Runtime environment variables
* TelegramToken - API token from telegram
* ChatID - where the notification should go
* HMACSecret - create a secret to validate API requests