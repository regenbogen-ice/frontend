import { FullScreenError } from '../components/misc/Error'
import { HTTPError } from '../util/dataFetcher'

export default function ErrorPage() {
    const error = new HTTPError()
    error.status = 404
    error.backendMessage = 'Seite nicht gefunden'

    return (
        <FullScreenError error={error} />
    )
}
