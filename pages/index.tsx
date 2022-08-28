import Head from 'next/head'
import styled from 'styled-components'
import { useRerenderPeriodically, useTrainVehicleCurrent } from '../util/hooks'
import { findCurrentTrip, generateTripHeadline } from '../util/trainDataUtil'
import { TrainTrip } from '../util/commonTypes'
import TrainDetailsView from '../components/layout/TrainDetailsView'
import { APP_BASE, RAINBOW_TZN } from '../util/constants'
import SearchBox from '../components/search/SearchBox'
import { ShortTimetable } from '../components/timetable/ShortTripTimetable'
import RainbowStripe from '../components/misc/RainboxStripe'
import Loader from '../components/misc/Loader'
import { InlineError } from '../components/misc/Error'

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
`

const Subtitle = styled.h2`
    margin: 20px 0;
`

const TimetableWrapper = styled.div``

const TimetablePuppet = styled.div`
    min-width: min(100vw, 20rem);
    min-height: 10rem;

    display: flex;
    justify-content: center;
    align-items: center;
`

function Header({currentTrip}: {currentTrip: TrainTrip}) {
    const tripHeadline: string = generateTripHeadline(currentTrip)

    return (
        <HeaderContainer>
            <TopHeader>
                <div>
                    <Title>Wo ist der Regenbogen-ICE?</Title>
                    <Subtitle>{tripHeadline}</Subtitle>
                </div>
                <TimetableWrapper>
                    <ShortTimetable trainTrip={currentTrip} />
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
    useRerenderPeriodically(3000)

    const { data, error } = useTrainVehicleCurrent(RAINBOW_TZN, 'ICE')

    if(error || !data) {
        const loading = !error

        return (
            <>
                <HeadSection />
                <HeaderContainer>
                    <TopHeader style={{marginBottom: loading ? '200px' : undefined}}>
                        <div>
                            <Title>Wo ist der Regenbogen-ICE?</Title>
                            <Subtitle>
                                {error ? (
                                    <>
                                        Keine Ahnung.
                                        {' '}
                                        <InlineError error={error} />
                                    </>
                                ) : '\xa0'}
                            </Subtitle>
                        </div>
                        <TimetablePuppet>
                            {loading ? <Loader /> : null}
                        </TimetablePuppet>
                    </TopHeader>
                    {!loading ? <RainbowStripe /> : null}
                </HeaderContainer>
            </>
        )
    }

    const currentTrip: TrainTrip = findCurrentTrip(data)

    return (
        <>
            <HeadSection />
            <Header currentTrip={currentTrip} />
            <TrainDetailsView currentTrip={currentTrip} vehicle={data} />
        </>
    )
}
