export default function handler(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.send(`User-agent: *
Allow: *
Disallow: /images/adridoesthings.webp
Disallow: /images/philippirl.webp
Disallow: /offline.html

Sitemap: ${process.env.NEXT_PUBLIC_APP_BASE}/sitemap.xml`)
}
