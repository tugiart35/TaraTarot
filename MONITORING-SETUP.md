# 📊 Monitoring & Analytics Setup

**Status:** Production deployed ✅  
**Next:** Monitoring & Analytics configuration  
**Estimated Time:** 20 minutes

---

## 🎯 Monitoring Strategy

### 1. Vercel Built-in Analytics

- **Web Analytics** - Page views, user sessions
- **Speed Insights** - Core Web Vitals
- **Function Logs** - API endpoint monitoring

### 2. Error Monitoring (Optional)

- **Sentry** - Error tracking & performance
- **LogRocket** - Session replay
- **Uptime Robot** - Uptime monitoring

---

## 1️⃣ Vercel Analytics Setup

### Enable Web Analytics

```bash
# Vercel Dashboard → Project → Analytics
# 1. Go to: https://vercel.com/bbktarots-projects/busbuskimki/analytics
# 2. Click "Enable Web Analytics"
# 3. Copy the tracking code
```

### Add to Application

```typescript
// src/app/layout.tsx - Add analytics
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### Environment Variables

```bash
# Vercel Dashboard → Settings → Environment Variables
VERCEL_ANALYTICS_ID=your-analytics-id
```

---

## 2️⃣ Error Monitoring Setup

### Option A: Sentry (Recommended)

```bash
# Install Sentry
npm install @sentry/nextjs

# Initialize Sentry
npx @sentry/wizard -i nextjs

# Environment Variables
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
SENTRY_ORG=your-org
SENTRY_PROJECT=busbuskimki
```

### Option B: LogRocket (Alternative)

```bash
# Install LogRocket
npm install logrocket

# Initialize LogRocket
import LogRocket from 'logrocket';

LogRocket.init('your-app-id');
```

---

## 3️⃣ Uptime Monitoring

### UptimeRobot (Free - 50 monitors)

1. **Sign up:** [uptimerobot.com](https://uptimerobot.com)
2. **Add Monitor:**
   - URL: `https://busbuskimki-gqzn63hrw-bbktarots-projects.vercel.app`
   - Type: HTTP(s)
   - Interval: 5 minutes
   - Contacts: Email notifications

### Pingdom (Alternative)

1. **Sign up:** [pingdom.com](https://pingdom.com)
2. **Free tier:** 1 monitor
3. **Setup:** Similar to UptimeRobot

---

## 4️⃣ Performance Monitoring

### Core Web Vitals

```typescript
// Already included with Vercel Speed Insights
// Measures:
// - Largest Contentful Paint (LCP)
// - First Input Delay (FID)
// - Cumulative Layout Shift (CLS)
```

### Custom Performance Metrics

```typescript
// src/lib/analytics.ts
export const trackEvent = (eventName: string, properties?: any) => {
  if (typeof window !== 'undefined') {
    // Google Analytics 4
    gtag('event', eventName, properties);

    // Vercel Analytics
    analytics.track(eventName, properties);
  }
};

// Usage examples:
trackEvent('tarot_reading_started', { type: 'love_spread' });
trackEvent('payment_completed', { amount: 50, currency: 'TRY' });
trackEvent('user_registration', { method: 'email' });
```

---

## 5️⃣ Database Monitoring

### Supabase Monitoring

```sql
-- Database performance queries
SELECT
  schemaname,
  tablename,
  n_tup_ins as inserts,
  n_tup_upd as updates,
  n_tup_del as deletes,
  n_live_tup as live_tuples,
  n_dead_tup as dead_tuples
FROM pg_stat_user_tables
ORDER BY n_live_tup DESC;

-- Slow queries
SELECT
  query,
  calls,
  total_time,
  mean_time,
  rows
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

### Database Alerts

- **Connection limits** - Monitor concurrent connections
- **Query performance** - Alert on slow queries (>1s)
- **Storage usage** - Alert when >80% full
- **Backup status** - Verify daily backups

---

## 6️⃣ Security Monitoring

### Vercel Security Headers

```typescript
// Already configured in middleware.ts
// Monitor for:
// - Failed authentication attempts
// - Suspicious IP addresses
// - Rate limiting triggers
```

### Security Alerts

```bash
# Environment variables to monitor:
# - Failed login attempts
# - Unusual traffic patterns
# - API abuse
# - Database access anomalies
```

---

## 7️⃣ Business Metrics

### Key Performance Indicators (KPIs)

```typescript
// Track these metrics:
const businessMetrics = {
  // User Engagement
  dailyActiveUsers: 0,
  sessionDuration: 0,
  bounceRate: 0,

  // Conversion Metrics
  registrationRate: 0,
  paymentConversion: 0,
  tarotReadingCompletion: 0,

  // Revenue Metrics
  totalRevenue: 0,
  averageOrderValue: 0,
  customerLifetimeValue: 0,

  // Technical Metrics
  pageLoadTime: 0,
  errorRate: 0,
  uptime: 0,
};
```

### Dashboard Setup

```typescript
// Create monitoring dashboard
// Tools: Grafana, DataDog, or custom dashboard
// Metrics to display:
// - Real-time user count
// - Revenue tracking
// - Error rates
// - Performance metrics
```

---

## 8️⃣ Alert Configuration

### Critical Alerts (Immediate Response)

- **Site Down** - 0% uptime for 5+ minutes
- **High Error Rate** - >5% error rate
- **Payment Failures** - Any payment system errors
- **Database Issues** - Connection failures

### Warning Alerts (Monitor)

- **Slow Performance** - Page load >3 seconds
- **High Traffic** - Unusual traffic spikes
- **Storage Usage** - Database >80% full
- **SSL Certificate** - Expires in 30 days

### Notification Channels

- **Email** - All alerts
- **Slack** - Critical alerts only
- **SMS** - Site down alerts only

---

## 9️⃣ Implementation Checklist

### Vercel Analytics

- [ ] Enable Web Analytics in Vercel Dashboard
- [ ] Add `<Analytics />` to layout.tsx
- [ ] Add `<SpeedInsights />` to layout.tsx
- [ ] Verify tracking in browser dev tools

### Error Monitoring

- [ ] Install Sentry (optional)
- [ ] Configure error boundaries
- [ ] Test error reporting
- [ ] Setup alert rules

### Uptime Monitoring

- [ ] Create UptimeRobot account
- [ ] Add website monitor
- [ ] Configure email notifications
- [ ] Test alert system

### Performance Monitoring

- [ ] Verify Core Web Vitals tracking
- [ ] Setup custom event tracking
- [ ] Monitor API response times
- [ ] Track user interactions

### Security Monitoring

- [ ] Review security headers
- [ ] Monitor failed login attempts
- [ ] Setup rate limiting alerts
- [ ] Track suspicious activity

---

## 🔧 Quick Setup Commands

### Enable Vercel Analytics

```bash
# 1. Go to Vercel Dashboard
# 2. Project → Analytics → Enable
# 3. Add to layout.tsx:
#    <Analytics />
#    <SpeedInsights />
```

### Setup Uptime Monitoring

```bash
# 1. Sign up at uptimerobot.com
# 2. Add monitor for:
#    https://busbuskimki-gqzn63hrw-bbktarots-projects.vercel.app
# 3. Configure 5-minute intervals
# 4. Add email notifications
```

### Test Monitoring

```bash
# Test error reporting:
curl -X POST https://your-domain.com/api/test-error

# Test performance:
curl -w "@curl-format.txt" -o /dev/null -s https://your-domain.com

# Test uptime:
curl -I https://your-domain.com
```

---

## 📊 Expected Metrics

### Performance Targets

- **Page Load Time:** <2 seconds
- **First Contentful Paint:** <1.5 seconds
- **Largest Contentful Paint:** <2.5 seconds
- **Cumulative Layout Shift:** <0.1
- **First Input Delay:** <100ms

### Availability Targets

- **Uptime:** >99.9%
- **Error Rate:** <1%
- **Response Time:** <500ms (API)
- **Database Response:** <100ms

### Business Targets

- **Conversion Rate:** >5%
- **Session Duration:** >3 minutes
- **Bounce Rate:** <40%
- **User Retention:** >30% (7-day)

---

## 🚨 Troubleshooting

### Common Issues

#### Analytics Not Tracking

```bash
# Check if tracking is enabled:
# 1. Vercel Dashboard → Analytics
# 2. Browser dev tools → Network tab
# 3. Look for analytics requests
```

#### High Error Rate

```bash
# Check error logs:
vercel logs

# Common fixes:
# - Check environment variables
# - Verify database connections
# - Review API endpoints
```

#### Slow Performance

```bash
# Performance analysis:
# 1. Vercel Speed Insights
# 2. Google PageSpeed Insights
# 3. WebPageTest.org
# 4. Lighthouse audit
```

---

## 📞 Support

### Vercel Support

- **Analytics Issues:**
  [Vercel Analytics Docs](https://vercel.com/docs/analytics)
- **Performance:** [Speed Insights Docs](https://vercel.com/docs/speed-insights)

### Third-party Services

- **Sentry:** [Sentry Support](https://sentry.io/support/)
- **UptimeRobot:** [UptimeRobot Support](https://uptimerobot.com/help/)

---

## 🎯 Next Steps

1. **Enable Vercel Analytics** (5 minutes)
2. **Setup Uptime Monitoring** (10 minutes)
3. **Configure Alerts** (5 minutes)
4. **Test Monitoring** (5 minutes)

**Total Time:** 25 minutes  
**Status:** Ready for monitoring setup
