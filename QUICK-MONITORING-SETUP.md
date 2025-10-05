# ⚡ Quick Monitoring Setup - 15 Minutes

**Production URL:**
https://busbuskimki-gqzn63hrw-bbktarots-projects.vercel.app  
**Status:** Ready for monitoring setup

---

## 🚀 1. Vercel Analytics (5 minutes)

### Enable in Dashboard

1. **Go to:** https://vercel.com/bbktarots-projects/busbuskimki/analytics
2. **Click:** "Enable Web Analytics"
3. **Copy:** Tracking code (if needed)

### Add to Layout

```typescript
// src/app/layout.tsx - Add these imports:
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Add to return statement:
return (
  <html lang="en">
    <body>
      {children}
      <Analytics />
      <SpeedInsights />
    </body>
  </html>
);
```

---

## 📊 2. UptimeRobot Setup (5 minutes)

### Create Account

1. **Sign up:** https://uptimerobot.com
2. **Free plan:** 50 monitors

### Add Monitor

```
Monitor Type: HTTP(s)
URL: https://busbuskimki-gqzn63hrw-bbktarots-projects.vercel.app
Friendly Name: Busbuskimki Production
Monitoring Interval: 5 minutes
Timeout: 30 seconds
```

### Notification Settings

```
Email: your-email@gmail.com
SMS: +382 (67) 010176 (optional)
```

---

## 🔍 3. Performance Monitoring (3 minutes)

### Core Web Vitals (Automatic)

- ✅ **Largest Contentful Paint (LCP)** - <2.5s
- ✅ **First Input Delay (FID)** - <100ms
- ✅ **Cumulative Layout Shift (CLS)** - <0.1

### Custom Events (Optional)

```typescript
// Track important events:
import { track } from '@vercel/analytics';

// Tarot reading started
track('tarot_reading_started', { type: 'love_spread' });

// Payment completed
track('payment_completed', { amount: 50 });

// User registration
track('user_registered', { method: 'email' });
```

---

## 🚨 4. Error Monitoring (2 minutes)

### Basic Error Tracking

```typescript
// Error boundary already exists
// src/components/shared/ui/ErrorBoundary.tsx

// For custom error tracking:
window.addEventListener('error', event => {
  console.error('Global error:', event.error);
  // Send to analytics if needed
});
```

### API Error Monitoring

```typescript
// API routes already have error handling
// Check Vercel Function logs for API errors
```

---

## ✅ Quick Checklist

### Vercel Analytics

- [ ] Go to Vercel Dashboard → Analytics
- [ ] Click "Enable Web Analytics"
- [ ] Add `<Analytics />` to layout.tsx
- [ ] Add `<SpeedInsights />` to layout.tsx

### Uptime Monitoring

- [ ] Sign up at uptimerobot.com
- [ ] Add monitor for production URL
- [ ] Set 5-minute intervals
- [ ] Add email notifications

### Performance Tracking

- [ ] Verify Speed Insights working
- [ ] Check Core Web Vitals
- [ ] Test page load times

### Error Monitoring

- [ ] Check Vercel Function logs
- [ ] Test error boundaries
- [ ] Verify API error handling

---

## 🎯 Expected Results

### After Setup

- **Real-time analytics** in Vercel Dashboard
- **Uptime monitoring** with email alerts
- **Performance metrics** automatically tracked
- **Error logs** available in Vercel

### Monitoring URLs

- **Vercel Analytics:**
  https://vercel.com/bbktarots-projects/busbuskimki/analytics
- **Vercel Functions:**
  https://vercel.com/bbktarots-projects/busbuskimki/functions
- **UptimeRobot:** https://uptimerobot.com/dashboard

---

## 🚀 Ready to Deploy Monitoring

**Next Steps:**

1. Enable Vercel Analytics (5 min)
2. Setup UptimeRobot (5 min)
3. Test monitoring (5 min)

**Total Time:** 15 minutes  
**Status:** Ready for monitoring deployment
