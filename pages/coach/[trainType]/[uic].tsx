import Head from 'next/head'
import { useRouter } from 'next/router'
import { HeaderContainer } from '../../../components/misc/CommonStyles'
import Header from '../../../components/misc/Header'
import UicID, { formatUIC } from '../../../components/misc/UicID'
import SearchBox from '../../../components/search/SearchBox'
import { useRerenderPeriodically } from '../../../util/hooks'

export default function ParameterWaitingView() {
    const router = useRouter()
    const { uic, trainType } = router.query
    
    if(!trainType) {
        return null
    }

    return (
        <Coach uic={uic as string} trainType={trainType as string} />
    )
}

function Coach({uic, trainType}: {uic: string, trainType: string}) {
    useRerenderPeriodically(3000)

    const head = (
        <Head>
            <title>{`${trainType}-Wagen ${formatUIC(uic)}`}</title>
        </Head>
    )

    return (
        <>
            {head}
            <Header />
            <CoachHeader uic={uic} />
        </>
    )
}

function CoachHeader({uic}: {uic: string}) {
    return (
        <HeaderContainer>
            <h1>
                <UicID uic={uic} />    
            </h1>
            <h2>placeholder</h2>
            <SearchBox />
        </HeaderContainer>
    )
}
