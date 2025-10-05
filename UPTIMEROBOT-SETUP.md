# 📊 UptimeRobot Setup Guide

**Website:** https://busbuskimki.com  
**Purpose:** Uptime monitoring with email alerts  
**Estimated Time:** 5 minutes

---

## 🚀 Quick Setup Steps

### 1. Create Account

1. **Go to:** https://uptimerobot.com
2. **Click:** "Sign Up" (top right)
3. **Enter:** Email address
4. **Create:** Password
5. **Verify:** Email verification

### 2. Add Monitor

1. **Click:** "Add New Monitor" (big blue button)
2. **Monitor Type:** HTTP(s)
3. **Friendly Name:** `Busbuskimki Production`
4. **URL:** `https://busbuskimki.com`
5. **Monitoring Interval:** 5 minutes
6. **Timeout:** 30 seconds
7. **Click:** "Create Monitor"

### 3. Configure Alerts

1. **Go to:** Settings → Alert Contacts
2. **Add Email Contact:**
   - **Type:** Email
   - **Friendly Name:** `Main Email`
   - **Email:** `busbuskimkionline@gmail.com`
   - **Save Contact**

### 4. Set Alert Preferences

1. **Go to:** My Monitors
2. **Click:** Edit (pencil icon) on your monitor
3. **Alert Contacts:** Select your email contact
4. **Alert When:** Down (immediate notification)
5. **Save Changes**

---

## 📱 Optional: SMS Alerts

### Setup SMS (Optional)

1. **Go to:** Settings → Alert Contacts
2. **Add SMS Contact:**
   - **Type:** SMS
   - **Friendly Name:** `SMS Alerts`
   - **Phone:** `+382 (67) 010176`
   - **Note:** SMS requires credits (paid feature)

---

## 🔧 Advanced Configuration

### Monitor Settings

```
Monitor Type: HTTP(s)
URL: https://busbuskimki.com
Friendly Name: Busbuskimki Production
Monitoring Interval: 5 minutes
Timeout: 30 seconds
Port: 443
Keyword: (leave empty)
Authentication: None
```

### Alert Settings

```
Down Alert: Immediate (0 minutes)
Up Alert: 0 minutes
Maintenance Window: None
Alert Contacts: Your email
```

### Additional Monitors (Optional)

```
Monitor 2:
- URL: https://www.busbuskimki.com
- Purpose: WWW subdomain monitoring

Monitor 3:
- URL: https://busbuskimki.com/tr
- Purpose: Turkish locale monitoring

Monitor 4:
- URL: https://busbuskimki.com/en
- Purpose: English locale monitoring
```

---

## 📊 Expected Results

### After Setup

- ✅ **Real-time monitoring** every 5 minutes
- ✅ **Email alerts** when site goes down
- ✅ **Uptime statistics** and reports
- ✅ **Response time tracking**
- ✅ **Historical data** and trends

### Dashboard Features

- **Uptime percentage** (should be 99.9%+)
- **Average response time** (should be <2 seconds)
- **Last 24 hours** uptime chart
- **Incident history** and alerts
- **Monthly reports** via email

---

## 🚨 Alert Examples

### Down Alert Email

```
Subject: [UptimeRobot] DOWN: Busbuskimki Production

Your monitor Busbuskimki Production (https://busbuskimki.com) is DOWN.

Time: October 1, 2025 14:30:00 CEST
Reason: HTTP 500 Error
Response Time: 30.00 seconds
```

### Up Alert Email

```
Subject: [UptimeRobot] UP: Busbuskimki Production

Your monitor Busbuskimki Production (https://busbuskimki.com) is UP.

Time: October 1, 2025 14:35:00 CEST
Response Time: 1.25 seconds
```

---

## 📈 Monitoring Benefits

### Business Impact

- **Immediate notification** of outages
- **Historical uptime data** for SLA reporting
- **Performance tracking** over time
- **Peace of mind** knowing site is monitored

### Technical Benefits

- **Early detection** of server issues
- **Response time monitoring** for performance
- **SSL certificate monitoring** (optional)
- **Port monitoring** (optional)

---

## 🔧 Troubleshooting

### Common Issues

#### Monitor Shows "Down" But Site Works

```
Possible Causes:
1. DNS propagation delay
2. Firewall blocking UptimeRobot
3. Server overload (slow response)
4. SSL certificate issues

Solutions:
1. Wait 5-10 minutes
2. Check server logs
3. Test manually from browser
4. Verify SSL certificate
```

#### No Email Alerts

```
Check:
1. Email in spam folder
2. Alert contact is configured
3. Monitor is not in maintenance
4. Email address is correct
```

#### False Positives

```
Adjustments:
1. Increase timeout to 60 seconds
2. Change interval to 10 minutes
3. Add keyword monitoring
4. Check for maintenance windows
```

---

## 📋 Setup Checklist

### Basic Setup

- [ ] Create UptimeRobot account
- [ ] Verify email address
- [ ] Add HTTP(s) monitor for busbuskimki.com
- [ ] Set 5-minute interval
- [ ] Configure email alerts
- [ ] Test alert system

### Optional Setup

- [ ] Add WWW subdomain monitor
- [ ] Add locale-specific monitors
- [ ] Setup SMS alerts (paid)
- [ ] Configure maintenance windows
- [ ] Set up monthly reports

---

## 🎯 Expected Performance

### Uptime Targets

- **Target Uptime:** 99.9%
- **Expected Response Time:** <2 seconds
- **Alert Response:** Immediate (0 minutes)
- **Monitoring Frequency:** Every 5 minutes

### Free Plan Limits

- **50 monitors** maximum
- **5-minute intervals** minimum
- **Email alerts** unlimited
- **SMS alerts** require credits
- **Historical data** 2 months

---

## 📞 Support

### UptimeRobot Support

- **Help Center:** https://uptimerobot.com/help/
- **Email Support:** Available for paid plans
- **Community Forum:** https://uptimerobot.com/forum/

### Our Setup Support

- **Email:** busbuskimkionline@gmail.com
- **Phone:** +382 (67) 010176

---

## 🚀 Ready to Setup

**Next Steps:**

1. Go to https://uptimerobot.com
2. Create account (2 minutes)
3. Add monitor for https://busbuskimki.com (2 minutes)
4. Configure email alerts (1 minute)

**Total Time:** 5 minutes  
**Status:** Ready for UptimeRobot setup
