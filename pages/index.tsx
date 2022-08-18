import Head from 'next/head'
import styled from 'styled-components'
import { useRerenderPeriodically, useTrainVehicleCurrent } from '../util/hooks'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { findCurrentTrip, generateTripHeadline } from '../util/trainDataUtil'
import { TrainTrip } from '../util/commonTypes'
import { ShortTimetable } from '../components/NodeView'
import { TrainDetailsView } from '../components/TrainDetailsView'
import { RAINBOW_TZN } from '../util/constants'
import SearchView from '../components/SearchView'

const HeaderContainer = styled.div`
    padding: 0 20px;
    
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    min-height: 100vh;
`

const TopHeader = styled.div`
    position: relative;
    display: flex;
    min-height: 25rem;
    flex-direction: column;

    @media only screen and (min-width: 900px) {
        align-items: center;
        min-height: 35vh;
        flex-direction: row;
        gap: 10rem;
        padding: 3rem;
    }
`

const RainbowStripeContainer = styled(motion.svg)`
    width: 100vw;
    height: 50px;
    align-self: center;
    margin: 30px 0;

    shape-rendering: crispedges;

    @media only screen and (min-width: 900px) {
        margin-top: 10vh;
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
    width: 20rem;
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
            <SearchView />
            <RainbowStripe />
        </HeaderContainer>
    )
}

function RainbowStripe() {
    const colors = ['#e40303', '#ff8c00', '#ffed00', '#008026', '#004dff', '#750787']

    const stripeContainer = {
        hidden: {
            
        },
        show: {
            transition: {
                staggerChildren: .1,
                staggerDirection: -1,
            },
        },
    }

    const stripeItem = {
        hidden: {
            width: '0%',
        },
        show: {
            width: '100%',
            transition: {
                duration: .5,
            },
        },
    }

    return (
        <RainbowStripeContainer
            initial='hidden'
            animate='show'
            variants={stripeContainer}

            viewBox='0 0 1 6' 
            preserveAspectRatio='none'>
            {colors.map((color, index) => {
                return (
                    <motion.rect
                        key={'stripe' + index}

                        variants={stripeItem}

                        x='0'
                        y={index}
                        width='100%'
                        height='1'
                        fill={color} 
                    />
                )
            })}
        </RainbowStripeContainer>
    )
}

function HeadSection() {
    return (
        <Head>
            <title>Wo ist der Regenbogen-ICE?</title>
            <link rel="canonical" href={process.env.NEXT_PUBLIC_APP_BASE + '/'} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Wo ist der Regenbogen ICE?" />
            <meta name="twitter:description" content="Tracke den Regenbogen-ICE auf seinem Weg durch ganz Deutschland" />
            <meta name="twitter:image:src" content={process.env.NEXT_PUBLIC_APP_BASE + '/images/twittercard.png'} />
            <meta property="og:title" content="Wo ist der Regenbogen ICE?" />
            <meta property="og:image" content={process.env.NEXT_PUBLIC_APP_BASE + '/images/twittercard.png'} />
            <meta name="description" content="Tracke den Regenbogen-ICE auf dem ganzen Streckennetz der Deutschen Bahn!" />
            <meta name="keywords" content="regenbogen ice, wo ist der regenbogen ice, regenbogen ice fahrplan, regenbogen ice strecke, regenbogen ice nummer, regenbogen ice db, zug" /> 
        </Head>
    )
}

export default function IndexPage() {
    useRerenderPeriodically(3000)

    const { data, error } = useTrainVehicleCurrent(RAINBOW_TZN, 'ICE')

    if(error || !data) {
        return (
            <>
                <HeadSection />
                <HeaderContainer>
                    <TopHeader>
                        <div>
                            <Title>Wo ist der Regenbogen-ICE?</Title>
                            <Subtitle>
                                {error ? `Keine Ahnung. (${error.toString()})` : '...'}
                            </Subtitle>
                        </div>
                        <TimetablePuppet />
                    </TopHeader>
                    <RainbowStripe />
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
