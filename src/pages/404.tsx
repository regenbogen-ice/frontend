import { FullScreenError } from '../components/misc/Error'
import { StatusError } from '../util/dataFetcher'

export default function ErrorPage() {
    const error = new StatusError('404', 'Seite nicht gefunden')

    return (
        <FullScreenError error={error} />
    )
}
