import Head from 'next/head'
import { useRouter } from 'next/router'
import CoachDetailsView from '../../components/layout/CoachDetailsView'
import { NoDataComponent } from '../../components/misc/CommonComponents'
import { HeaderContainer } from '../../components/misc/CommonStyles'
import Footer from '../../components/misc/Footer'
import NavigationBar from '../../components/misc/NavigationBar'
import UicID, { formatUIC } from '../../components/misc/UicID'
import SearchBox from '../../components/search/SearchBox'
import { Coach } from '../../util/commonTypes'
import { REFRESH_INTERVAL } from '../../util/constants'
import { useCoach, useRerenderPeriodically } from '../../util/hooks'

export default function ParameterWaitingView() {
    const router = useRouter()
    const { uic } = router.query
    
    if(!router.isReady) {
        return <NoDataComponent error={null} title={''} />
    }

    return (
        <CoachView uic={uic as string} />
    )
}

function CoachView({uic}: {uic: string}) {
    useRerenderPeriodically(REFRESH_INTERVAL)

    const { data, error } = useCoach(uic)
    if(error || !data) {
        return <NoDataComponent error={error} title={`Wagen ${formatUIC(uic)}`} />
    }

    const coach = data[0]

    return (
        <>
            <Head>
                <title>{`Wagen ${formatUIC(coach.uic)}`}</title>
            </Head>
            <NavigationBar />
            <CoachHeader coach={coach} />
            <CoachDetailsView coach={coach} />
            <Footer />
        </>
    )
}

function CoachHeader({coach}: {coach: Coach}) {
    return (
        <HeaderContainer>
            <h1>
                <UicID uic={coach.uic} />    
            </h1>
            <h2>{coach.type}</h2>
            <SearchBox />
        </HeaderContainer>
    )
}
