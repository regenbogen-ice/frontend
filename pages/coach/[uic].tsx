import Head from 'next/head'
import { useRouter } from 'next/router'
import { NoDataComponent } from '../../components/misc/CommonComponents'
import { HeaderContainer } from '../../components/misc/CommonStyles'
import Header from '../../components/misc/Header'
import UicID, { formatUIC } from '../../components/misc/UicID'
import SearchBox from '../../components/search/SearchBox'
import { useRerenderPeriodically } from '../../util/hooks'

export default function ParameterWaitingView() {
    const router = useRouter()
    const { uic } = router.query
    
    if(!router.isReady) {
        return <NoDataComponent error={null} title={''} />
    }

    return (
        <Coach uic={uic as string} />
    )
}

function Coach({uic}: {uic: string}) {
    useRerenderPeriodically(3000)

    return (
        <>
            <Head>
                <title>{`Wagen ${formatUIC(uic)}`}</title>
            </Head>
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
