# Montérin - Marketing Tools Setup Guide

## Email Marketing & Newsletter

### 1. Klaviyo (Recommended for Luxury E-commerce)
**Best for**: High-end jewelry, personalized campaigns, customer segmentation

**Setup**:
```bash
# Add to .env.local
KLAVIYO_PRIVATE_KEY=your_private_key_here
KLAVIYO_LIST_ID=your_list_id_here
```

**Features**:
- Advanced segmentation (VIP customers, high-value prospects)
- Automated flows (abandoned cart, post-purchase)
- SMS marketing integration
- Dynamic product recommendations
- A/B testing

**Pricing**: Starts at $45/month (500 contacts)

---

### 2. Mailchimp
**Best for**: Simple newsletter campaigns, ease of use

**Setup**:
```bash
# Add to .env.local
MAILCHIMP_API_KEY=your_api_key_here
MAILCHIMP_LIST_ID=your_list_id_here
MAILCHIMP_SERVER_PREFIX=us1  # Check your account
```

**Features**:
- Pre-built templates
- Basic automation
- Landing pages
- Social media integration

**Pricing**: Free tier (500 contacts), then $13/month

---

### 3. ConvertKit
**Best for**: Content marketing, storytelling

**Setup**:
```bash
CONVERTKIT_API_KEY=your_api_key_here
CONVERTKIT_FORM_ID=your_form_id_here
```

---

## Transactional Email

### Resend (Modern, Developer-Friendly)
**Best for**: Order confirmations, inquiry notifications

**Setup**:
```bash
RESEND_API_KEY=your_api_key_here
```

**Pricing**: 3,000 emails/month free, then $20/month

---

### SendGrid
**Alternative to Resend**

**Setup**:
```bash
SENDGRID_API_KEY=your_api_key_here
```

**Pricing**: 100 emails/day free, then $20/month

---

## Analytics & Tracking

### 1. Google Analytics 4 (GA4)
**Already integrated in layout.tsx**

**Features**:
- Page views, user flow
- E-commerce tracking
- Conversion funnels
- Audience demographics

**Setup**: Add your measurement ID to `NEXT_PUBLIC_GA_MEASUREMENT_ID`

---

### 2. PostHog (Product Analytics)
**Best for**: User behavior, A/B testing, session recordings

**Setup**:
```bash
npm install posthog-js
```

```typescript
// Add to layout.tsx
import posthog from 'posthog-js'

if (typeof window !== 'undefined') {
  posthog.init('YOUR_POSTHOG_KEY', {
    api_host: 'https://app.posthog.com'
  })
}
```

**Pricing**: Free for 1M events/month

---

### 3. Mixpanel
**Best for**: Event tracking, cohort analysis

**Pricing**: Free for 100k events/month

---

## CRM & Customer Management

### 1. HubSpot
**Best for**: Luxury sales process, lead nurturing

**Features**:
- Contact management
- Deal pipeline
- Email sequences
- Live chat

**Pricing**: Free tier, then $45/month

---

### 2. Salesforce
**Best for**: Enterprise-level luxury brands

**Pricing**: Starts at $25/user/month

---

## Live Chat & Support

### 1. Intercom
**Best for**: High-touch customer support

**Features**:
- Live chat
- Chatbots
- Product tours
- Knowledge base

**Pricing**: $39/month

---

### 2. Zendesk
**Best for**: Ticketing and support

**Pricing**: $19/agent/month

---

## Recommended Stack for Montérin

**Essential**:
- ✅ Klaviyo (email marketing)
- ✅ Resend (transactional emails)
- ✅ Google Analytics 4 (web analytics)

**Nice to Have**:
- PostHog (user behavior insights)
- Intercom (VIP customer chat)
- HubSpot CRM (lead management)

---

## Current Setup

The following APIs are ready to use:
- `POST /api/newsletter` - Newsletter signups
- `POST /api/inquiries` - Contact form submissions

Update your `.env.local` with the keys above to activate integrations.
