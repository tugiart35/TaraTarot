import { Metadata } from "next";

export const metadata: Metadata = { title: "Giriş — BüşBüşKimKi", description:
"BüşBüşKimKi hesabınıza güvenli şekilde giriş yapın.", alternates: { canonical:
"https://busbuskimki.com/tr/auth/sign-in", languages: { tr:
"https://busbuskimki.com/tr/auth/sign-in", en:
"https://busbuskimki.com/en/auth/sign-in", sr:
"https://busbuskimki.com/sr/auth/sign-in" } }, openGraph: { title: "Giriş —
BüşBüşKimKi", description: "BüşBüşKimKi hesabınıza güvenli şekilde giriş
yapın.", url: "https://busbuskimki.com/tr/auth/sign-in", siteName:
"BüşBüşKimKi", images: [{ url:
"https://busbuskimki.com/assets/logo/social-og-auth.jpg", width: 1200, height:
630, alt: "BüşBüşKimKi - Giriş" }], type: "website" }, twitter: { card:
"summary", title: "Giriş — BüşBüşKimKi", description: "BüşBüşKimKi hesabınıza
güvenli şekilde giriş yapın.", images:
["https://busbuskimki.com/assets/logo/twitter-card-auth.jpg"] }, robots: {
index: false, follow: false, nocache: true } };

export default function SignInPageTR() { const orgLd = { "@context":
"https://schema.org", "@type": "Organization", name: "BüşBüşKimKi", url:
"https://busbuskimki.com/tr/auth/sign-in", logo:
"https://busbuskimki.com/assets/logo/logo.png" };

const websiteLd = { "@context": "https://schema.org", "@type": "WebSite", name:
"BüşBüşKimKi", url: "https://busbuskimki.com/tr/auth/sign-in" };

const breadcrumbLd = { "@context": "https://schema.org", "@type":
"BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name:
"Anasayfa", item: "https://busbuskimki.com/tr/anasayfa" }, { "@type":
"ListItem", position: 2, name: "Giriş", item:
"https://busbuskimki.com/tr/auth/sign-in" } ] };

return ( <main> <h1>Giriş</h1> {/_ auth form (client) _/} <script
type="application/ld+json"
dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} /> <script
type="application/ld+json"
dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} /> <script
type="application/ld+json"
dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} /> </main> );
} import { Metadata } from "next";

export const metadata: Metadata = { title: "Sign In — BüşBüşKimKi", description:
"Sign in to your BüşBüşKimKi account securely.", alternates: { canonical:
"https://busbuskimki.com/en/auth/sign-in", languages: { tr:
"https://busbuskimki.com/tr/auth/sign-in", en:
"https://busbuskimki.com/en/auth/sign-in", sr:
"https://busbuskimki.com/sr/auth/sign-in" } }, openGraph: { title: "Sign In —
BüşBüşKimKi", description: "Sign in to your BüşBüşKimKi account securely.", url:
"https://busbuskimki.com/en/auth/sign-in", siteName: "BüşBüşKimKi", images: [{
url: "https://busbuskimki.com/assets/logo/social-og-auth.jpg", width: 1200,
height: 630, alt: "BüşBüşKimKi - Sign In" }], type: "website" }, twitter: {
card: "summary", title: "Sign In — BüşBüşKimKi", description: "Sign in to your
BüşBüşKimKi account securely.", images:
["https://busbuskimki.com/assets/logo/twitter-card-auth.jpg"] }, robots: {
index: false, follow: false, nocache: true } }; import { Metadata } from "next";

export const metadata: Metadata = { title: "Пријава — BüşBüşKimKi", description:
"Пријавите се на свој BüşBüşKimKi налог сигурно.", alternates: { canonical:
"https://busbuskimki.com/sr/auth/sign-in", languages: { tr:
"https://busbuskimki.com/tr/auth/sign-in", en:
"https://busbuskimki.com/en/auth/sign-in", sr:
"https://busbuskimki.com/sr/auth/sign-in" } }, openGraph: { title: "Пријава —
BüşBüşKimKi", description: "Пријавите се на свој BüşBüşKimKi налог сигурно.",
url: "https://busbuskimki.com/sr/auth/sign-in", siteName: "BüşBüşKimKi", images:
[{ url: "https://busbuskimki.com/assets/logo/social-og-auth.jpg", width: 1200,
height: 630, alt: "BüşBüşKimKi - Пријава" }], type: "website" }, twitter: {
card: "summary", title: "Пријава — BüşBüşKimKi", description: "Пријавите се на
свој BüşBüşKimKi налог сигурно.", images:
["https://busbuskimki.com/assets/logo/twitter-card-auth.jpg"] }, robots: {
index: false, follow: false, nocache: true } };
