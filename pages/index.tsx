import React from 'react'
import styled from 'styled-components'
import TrainDetailsView from '../components/TrainDetailsView'
import useSWR from 'swr'
import { APP_BASE, RAINBOWTZN } from '../scripts/constants'
import { fetchFromAPI, TrainVehicleData } from '../scripts/dataSources'
import type { TrainTripData } from '../scripts/dataSources'
import { Skeleton } from '../components/Common'
import { DateTime } from 'luxon'
import Head from 'next/head'
import Footer from '../components/Footer'

const PageHeader = styled.div`
    background-color: #FF007A;
    height: 100%;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    position: relative;
`

const WebsiteTitle = styled.h2`
    font-size: 2.75rem;
    font-weight: normal;
    color: #DCDBDB;
    margin: 20px 7.5vw;
`

const QuickAnswer = styled.h1`
    font-size: 4.5rem;
    font-weight: normal;
    margin: 20px 7.5vw;
    max-width: 1000px;
    word-break: break-word;
`

const RainbowBand = styled.img`
    width: 85%;
    height: 37px;
    align-self: center;
    margin: 30px 0;
    image-rendering: pixelated;
`

const ExpandIcon = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

export default function IndexPage(): JSX.Element {

    const { data, error }: { data?: TrainVehicleData, error?: Error } = useSWR([RAINBOWTZN, 'trainTrip'], fetchFromAPI)

    const head = (
        <Head>
            <title>Wo ist der Regenbogen ICE?</title>
            <link rel="canonical" href={APP_BASE + '/'} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Wo ist der Regenbogen ICE?" />
            <meta name="twitter:description" content="Tracke den Regenbogen-ICE auf seinem Weg durch ganz Deutschland" />
            <meta name="twitter:image:src" content={APP_BASE + '/images/twittercard.png'} />
            <meta property="og:title" content="Wo ist der Regenbogen ICE?" />
            <meta property="og:image" content={APP_BASE + '/images/twittercard.png'} />
            <meta name="description" content="Tracke den Regenbogen-ICE auf dem ganzen Streckennetz der Deutschen Bahn!" />
            <meta name="keywords" content="regenbogen ice, regenbogen ice fahrplan, regenbogen ice strecke, regenbogen ice nummer, regenbogen ice deutsche bahn, regenbogen ice db, zug" />
        </Head>
    )

    if(!data || error) {
        return (
            <>
                {head}
                <PageHeader>
                    <WebsiteTitle>Wo ist der Regenbogen ICE?</WebsiteTitle>
                    <QuickAnswer>
                        {error ? (
                            <span>Offenbar spurlos verschwunden ({error.toString()})</span>
                        ) : (
                            <>
                                <Skeleton style={{height: '72px', width: '70vw', background: '#fff'}}></Skeleton>
                                <Skeleton style={{height: '72px', width: '40vw', background: '#fff'}}></Skeleton>
                            </>
                        )}
                    </QuickAnswer>
                    <RainbowBand src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAGCAIAAACNcmNmAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAIElEQVQI12N4wszM8L+HgeH/WwYmxslqDAy+/xlK2dsBXbUHbVjN9ncAAAAASUVORK5CYII=" />
                </PageHeader>
            </>
        )
    }

    const onArrowClick = () => {
        window.scrollTo({top: window.innerHeight, behavior: 'smooth'})
    }

    return (
        <>
            {head}
            <PageHeader>
                <WebsiteTitle>Wo ist der Regenbogen ICE?</WebsiteTitle>
                <QuickAnswer>
                    <QuickAnswerContent trips={data.trips} />
                </QuickAnswer>
                <RainbowBand src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAGCAIAAACNcmNmAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAIElEQVQI12N4wszM8L+HgeH/WwYmxslqDAy+/xlK2dsBXbUHbVjN9ncAAAAASUVORK5CYII=" />
                <ExpandIcon onClick={onArrowClick}>
                    <svg height="50px" viewBox="0 0 24 24" width="50px" fill="#FFFFFF"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/></svg>
                </ExpandIcon>
            </PageHeader>
            <TrainDetailsView data={data} />
            <Footer />
        </>
    )
}

function QuickAnswerContent({trips}: {trips: TrainTripData[]}) {
    let trainIndex: number = null

    for(let index = trips.length - 1; index >= 0; index--) {
        const trip = trips[index]

        if(trip.stops.length === 0) continue

        const lastStopTime = trip.stops[trip.stops.length - 1].arrival

        if(lastStopTime !== null) {
            if(DateTime.fromISO(lastStopTime, { zone: 'UTC' }) > DateTime.now()) {
                trainIndex = index
                break
            }
        }
    }

    if(trainIndex === null) {
        return (
            <>{trips.length !== 0 ? <span>Zuletzt gesehen als <b>{trips[0].train_type + '\xa0' + trips[0].train_number}</b> in <b>{trips[0].destination_station}</b></span> : null}</>
        )
    } else {
        return (
            <>{doesIceStartInFuture(trips[trainIndex]) ? makeIceStartTimeMessage(trips[trainIndex]) : 'Jetzt gerade als'} <b>{trips[trainIndex].train_type + '\xa0' + trips[trainIndex].train_number}</b> zwischen <b>{trips[trainIndex].origin_station}</b> und <b>{trips[trainIndex].destination_station}</b></>
        )
    }
}

function doesIceStartInFuture(trainTrip: TrainTripData) {
    const firstDepartureTime = getFirstDepartureTime(trainTrip)

    return firstDepartureTime > DateTime.now()
}

function makeIceStartTimeMessage(trainTrip: TrainTripData) {
    const firstDepartureTime = getFirstDepartureTime(trainTrip)

    let dateText = ''

    if(firstDepartureTime.toLocal() > DateTime.now().endOf('day')) { // if first departure is after today
        if(firstDepartureTime.toLocal() > DateTime.now().plus({days: 1}).endOf('day')) { // if first departure is after tomorrow
            dateText = 'dem ' + firstDepartureTime.toLocal().toFormat('dd.mm.') + ' um '
        } else {
            dateText = 'morgen um '
        }
    }

    return 'Ab ' + dateText + firstDepartureTime.toLocal().toFormat('HH:mm') + ' als'
}


function getFirstDepartureTime(trainTrip: TrainTripData): DateTime {
    if(!trainTrip.stops || !trainTrip.stops[0].departure) {
        return null
    }

    const firstDeparture = trainTrip.stops[0].departure
    return DateTime.fromISO(firstDeparture, { zone: 'UTC' })
}
