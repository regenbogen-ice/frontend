const trainsToInclude = [
    'Europa/Europe',
    'Bundesrepublik Deutschland',
    'Essen',
    'Mannheim',
    'Frankfurt am Main',
    'Freiburg im Breisgau',
    'Düsseldorf',
    'Linz am Rhein',
    'Amsterdam',
    'Stendal',
    'Bad Hersfeld',
    'Mittenwald',
    'Konstanz',
    'Göttingen',
    'Neu-Ulm',
    'Duisburg',
    'Celle',
    'Görlitz',
    'Riesa',
    'Westerland/Sylt',
    'Hannover',
    'Stuttgart',
]

function generateSitemap() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${process.env.NEXT_PUBLIC_APP_BASE}</loc>
        <changefreq>always</changefreq>
        <priority>1.0</priority>
    </url>
${trainsToInclude.map(trainName => 
`    <url>
        <loc>${process.env.NEXT_PUBLIC_APP_BASE}/details/${encodeURIComponent(trainName)}</loc>
        <changefreq>always</changefreq>
    </url>`).join('\n')}
</urlset>`
}

export default function handler(req, res) {
    res.setHeader('Content-Type', 'application/xml')
    res.send(generateSitemap())
} 
