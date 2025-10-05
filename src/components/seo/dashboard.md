// src/app/(protected)/sr/profil/dashboard/page.tsx import { Metadata } from
"next";

export const metadata: Metadata = { title: "Profil — Kontrolna Tabla |
BüşBüşKimKi", description: "Vaša kontrolna tabla naloga — rezervacije, prethodna
tumačenja i podešavanja profila.", alternates: { canonical:
"https://busbuskimki.com/sr/profil/dashboard", languages: { tr:
"https://busbuskimki.com/tr/profil/dashboard", en:
"https://busbuskimki.com/en/profile/dashboard", sr:
"https://busbuskimki.com/sr/profil/dashboard", } }, openGraph: { title: "Profil
— Kontrolna Tabla | BüşBüşKimKi", description: "Vaša kontrolna tabla naloga —
rezervacije, prethodna tumačenja i podešavanja profila.", url:
"https://busbuskimki.com/sr/profil/dashboard", siteName: "BüşBüşKimKi", images:
[ { url: "https://busbuskimki.com/assets/logo/social-og-dashboard.jpg", width:
1200, height: 630, alt: "BüşBüşKimKi - Dashboard" } ], type: "website" },
twitter: { card: "summary", title: "Profil — Kontrolna Tabla | BüşBüşKimKi",
description: "Vaša kontrolna tabla naloga — rezervacije, prethodna tumačenja i
podešavanja profila.", images:
["https://busbuskimki.com/assets/logo/twitter-card-dashboard.jpg"] }, robots: {
index: false, follow: false, nocache: true } };

export default function DashboardPageSR() { const orgLd = { "@context":
"https://schema.org", "@type": "Organization", name: "BüşBüşKimKi", url:
"https://busbuskimki.com/sr/profil/dashboard", logo:
"https://busbuskimki.com/assets/logo/logo.png", sameAs: [
"https://www.instagram.com/busbuskimki", "https://www.facebook.com/busbuskimki"
] };

const websiteLd = { "@context": "https://schema.org", "@type": "WebSite", name:
"BüşBüşKimKi", url: "https://busbuskimki.com/sr/profil/dashboard" };

const breadcrumbLd = { "@context": "https://schema.org", "@type":
"BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name:
"Početna", item: "https://busbuskimki.com/sr/pocetna" }, { "@type": "ListItem",
position: 2, name: "Profil", item: "https://busbuskimki.com/sr/profil" }, {
"@type": "ListItem", position: 3, name: "Kontrolna Tabla", item:
"https://busbuskimki.com/sr/profil/dashboard" } ] };

return ( <main> <h1>Profil — Kontrolna Tabla</h1> <script
type="application/ld+json"
dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} /> <script
type="application/ld+json"
dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} /> <script
type="application/ld+json"
dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} /> </main> );
} // src/app/(protected)/en/profile/dashboard/page.tsx import { Metadata } from
"next";

export const metadata: Metadata = { title: "Profile — Dashboard | BüşBüşKimKi",
description: "Your account dashboard — bookings, past readings and profile
settings.", alternates: { canonical:
"https://busbuskimki.com/en/profile/dashboard", languages: { tr:
"https://busbuskimki.com/tr/profil/dashboard", en:
"https://busbuskimki.com/en/profile/dashboard", sr:
"https://busbuskimki.com/sr/profil/dashboard", } }, openGraph: { title: "Profile
— Dashboard | BüşBüşKimKi", description: "Your account dashboard — bookings,
past readings and profile settings.", url:
"https://busbuskimki.com/en/profile/dashboard", siteName: "BüşBüşKimKi", images:
[ { url: "https://busbuskimki.com/assets/logo/social-og-dashboard.jpg", width:
1200, height: 630, alt: "BüşBüşKimKi - Dashboard" } ], type: "website" },
twitter: { card: "summary", title: "Profile — Dashboard | BüşBüşKimKi",
description: "Your account dashboard — bookings, past readings and profile
settings.", images:
["https://busbuskimki.com/assets/logo/twitter-card-dashboard.jpg"] }, robots: {
index: false, follow: false, nocache: true } };

export default function DashboardPageEN() { const orgLd = { "@context":
"https://schema.org", "@type": "Organization", name: "BüşBüşKimKi", url:
"https://busbuskimki.com/en/profile/dashboard", logo:
"https://busbuskimki.com/assets/logo/logo.png", sameAs: [
"https://www.instagram.com/busbuskimki", "https://www.facebook.com/busbuskimki"
] };

const websiteLd = { "@context": "https://schema.org", "@type": "WebSite", name:
"BüşBüşKimKi", url: "https://busbuskimki.com/en/profile/dashboard" };

const breadcrumbLd = { "@context": "https://schema.org", "@type":
"BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name:
"Home", item: "https://busbuskimki.com/en/home" }, { "@type": "ListItem",
position: 2, name: "Profile", item: "https://busbuskimki.com/en/profile" }, {
"@type": "ListItem", position: 3, name: "Dashboard", item:
"https://busbuskimki.com/en/profile/dashboard" } ] };

return ( <main> <h1>Profile — Dashboard</h1> <script type="application/ld+json"
dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} /> <script
type="application/ld+json"
dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} /> <script
type="application/ld+json"
dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} /> </main> );
} // src/app/(protected)/tr/dashboard/page.tsx import { Metadata } from "next";

export const metadata: Metadata = { title: "Profil — Gösterge Paneli |
BüşBüşKimKi", description: "Hesabınızın gösterge paneli — rezervasyonlar, geçmiş
okumalar ve profil ayarlarınız.", alternates: { canonical:
"https://busbuskimki.com/tr/profil/dashboard", languages: { tr:
"https://busbuskimki.com/tr/profil/dashboard", en:
"https://busbuskimki.com/en/profile/dashboard", sr:
"https://busbuskimki.com/sr/profil/dashboard", } }, openGraph: { title: "Profil
— Gösterge Paneli | BüşBüşKimKi", description: "Hesabınızın gösterge paneli —
rezervasyonlar, geçmiş ve profil ayarları.", url:
"https://busbuskimki.com/tr/profil/dashboard", siteName: "BüşBüşKimKi", images:
[ { url: "https://busbuskimki.com/assets/logo/social-og-dashboard.jpg", width:
1200, height: 630, alt: "BüşBüşKimKi - Dashboard" } ], type: "website" },
twitter: { card: "summary", title: "Profil — Gösterge Paneli | BüşBüşKimKi",
description: "Hesabınızın gösterge paneli — rezervasyonlar, geçmiş ve profil
ayarları.", images:
["https://busbuskimki.com/assets/logo/twitter-card-dashboard.jpg"] }, robots: {
index: false, follow: false, nocache: true } };

export default function DashboardPageTR() { const orgLd = { "@context":
"https://schema.org", "@type": "Organization", name: "BüşBüşKimKi", url:
"https://busbuskimki.com/tr/profil/dashboard", logo:
"https://busbuskimki.com/assets/logo/logo.png", sameAs: [
"https://www.instagram.com/busbuskimki", "https://www.facebook.com/busbuskimki"
] };

const websiteLd = { "@context": "https://schema.org", "@type": "WebSite", name:
"BüşBüşKimKi", url: "https://busbuskimki.com/tr/profil/dashboard" };

const breadcrumbLd = { "@context": "https://schema.org", "@type":
"BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name:
"Anasayfa", item: "https://busbuskimki.com/tr/anasayfa" }, { "@type":
"ListItem", position: 2, name: "Profil", item:
"https://busbuskimki.com/tr/profil" }, { "@type": "ListItem", position: 3, name:
"Gösterge Paneli", item: "https://busbuskimki.com/tr/profil/dashboard" } ] };

return ( <main> <h1>Profil — Gösterge Paneli</h1> {/_ Dashboard UI (protected)
_/} <script type="application/ld+json"
dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} /> <script
type="application/ld+json"
dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} /> <script
type="application/ld+json"
dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} /> </main> );
}
