import type { NextApiRequest, NextApiResponse } from 'next'
import { APP_BASE } from '../../util/constants'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Content-Type', 'text/plain')
    res.send(`User-agent: *
Allow: *
Disallow: /images/adridoesthings.webp
Disallow: /images/philippirl.webp
Disallow: /offline.html

Sitemap: ${APP_BASE}/sitemap.xml`)
}
