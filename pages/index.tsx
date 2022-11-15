import Head from 'next/head'
import styled from 'styled-components'
import { useRerenderPeriodically, useTrainVehicleCurrent } from '../util/hooks'
import { findCurrentTrip, generateTripHeadline, getTrainTripWithStops } from '../util/trainDataUtil'
import { TrainTrip } from '../util/commonTypes'
import TrainDetailsView from '../components/layout/TrainDetailsView'
import { APP_BASE, RAINBOW_TZN, REFRESH_INTERVAL } from '../util/constants'
import SearchBox from '../components/search/SearchBox'
import { ShortTimetable } from '../components/timetable/ShortTripTimetable'
import RainbowStripe from '../components/misc/RainboxStripe'
import Loader from '../components/misc/Loader'
import { InlineError } from '../components/misc/Error'
import Footer from '../components/misc/Footer'

const HeaderContainer = styled.div`
    padding: 0 20px;
    
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    min-height: 100%;
`

const TopHeader = styled.div`
    position: relative;
    display: flex;
    min-height: 15rem;
    flex-direction: column;

    @media only screen and (min-width: 900px) {
        align-items: center;
        min-height: 35vh;
        flex-direction: row;
        gap: 10rem;
        padding: 3rem;
    }
`

const Title = styled.h1`
    margin: 20px 0;

    word-break: break-word;
`

const TimetableWrapper = styled.div``

const TimetablePuppet = styled.div`
    min-width: min(25vw, 20rem);
    min-height: 10rem;

    display: flex;
    justify-content: center;
    align-items: center;
`

function Header({currentTrip}: {currentTrip: TrainTrip}) {
    const tripHeadline: string = generateTripHeadline(currentTrip)

    const tripWithStops = getTrainTripWithStops(currentTrip)

    return (
        <HeaderContainer>
            <TopHeader>
                <div>
                    <Title>Wo ist der Regenbogen-ICE?</Title>
                    <Title as={'h2'}>{tripHeadline}</Title>
                </div>
                <TimetableWrapper>
                    {tripWithStops && <ShortTimetable trainTrip={tripWithStops} />}
                </TimetableWrapper>
            </TopHeader>
            <SearchBox />
            <RainbowStripe />
        </HeaderContainer>
    )
}

function HeadSection() {
    return (
        <Head>
            <title>Wo ist der Regenbogen-ICE?</title>
            <link rel="canonical" href={APP_BASE + '/'} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Wo ist der Regenbogen ICE?" />
            <meta name="twitter:description" content="Tracke den Regenbogen-ICE auf seinem Weg durch ganz Deutschland" />
            <meta name="twitter:image:src" content={APP_BASE + '/images/twittercard.png'} />
            <meta property="og:title" content="Wo ist der Regenbogen ICE?" />
            <meta property="og:image" content={APP_BASE + '/images/twittercard.png'} />
            <meta name="description" content="Tracke den Regenbogen-ICE auf dem ganzen Streckennetz der Deutschen Bahn!" />
            <meta name="keywords" content="regenbogen ice, wo ist der regenbogen ice, regenbogen ice fahrplan, regenbogen ice strecke, regenbogen ice nummer, regenbogen ice db, zug" /> 
        </Head>
    )
}

export default function IndexPage() {
    useRerenderPeriodically(REFRESH_INTERVAL)

    const { data, error } = useTrainVehicleCurrent(RAINBOW_TZN, 'ICE')

    if(error) {
        return (
            <>
                <HeadSection />
                <HeaderContainer>
                    <TopHeader>
                        <div>
                            <Title>Wo ist der Regenbogen-ICE?</Title>
                            <Title as={'h2'}>
                                Keine Ahnung.
                                {' '}
                                <InlineError error={error} />
                            </Title>
                        </div>
                    </TopHeader>
                    <RainbowStripe />
                </HeaderContainer>
            </>
        )
    }

    if(!data) {
        return (
            <>
                <HeadSection />
                <HeaderContainer>
                    <TopHeader style={{marginBottom: '200px'}}>
                        <div>
                            <Title>Wo ist der Regenbogen-ICE?</Title>
                            <Title as={'h2'}>
                                {'\xa0'}
                            </Title>
                        </div>
                        <TimetablePuppet>
                            <Loader />
                        </TimetablePuppet>
                    </TopHeader>
                </HeaderContainer>
            </>
        )
    }

    const currentTrip = findCurrentTrip(data)

    return (
        <>
            <HeadSection />
            <Header currentTrip={currentTrip} />
            <TrainDetailsView currentTrip={currentTrip} vehicle={data} />
            <Footer />
        </>
    )
}
