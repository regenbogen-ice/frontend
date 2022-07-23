import React from 'react'
import styles from '../styles/Index.module.css'
import TrainDetailsView from '../components/TrainDetailsView'
import useSWR from 'swr'
import { APP_BASE, RAINBOWTZN } from '../scripts/constants'
import { fetchFromAPI, TrainVehicleData } from '../scripts/dataSources'
import type { TrainTripData } from '../scripts/dataSources'
import { DateTime } from 'luxon'
import Head from 'next/head'
import Footer from '../components/Footer'

export default function IndexPage(): JSX.Element {
    const { data, error }: { data?: TrainVehicleData; error?: Error } = useSWR(
        [RAINBOWTZN, 'trainTrip'],
        fetchFromAPI
    )

    const head = (
        <Head>
            <title>Wo ist der Regenbogen ICE?</title>
            <link rel="canonical" href={APP_BASE + '/'} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Wo ist der Regenbogen ICE?" />
            <meta
                name="twitter:description"
                content="Tracke den Regenbogen-ICE auf seinem Weg durch ganz Deutschland"
            />
            <meta
                name="twitter:image:src"
                content={APP_BASE + '/images/twittercard.png'}
            />
            <meta property="og:title" content="Wo ist der Regenbogen ICE?" />
            <meta
                property="og:image"
                content={APP_BASE + '/images/twittercard.png'}
            />
            <meta
                name="description"
                content="Tracke den Regenbogen-ICE auf dem ganzen Streckennetz der Deutschen Bahn!"
            />
            <meta
                name="keywords"
                content="regenbogen ice, regenbogen ice fahrplan, regenbogen ice strecke, regenbogen ice nummer, regenbogen ice deutsche bahn, regenbogen ice db, zug"
            />
        </Head>
    )

    if (!data || error) {
        return (
            <>
                {head}
                <div className={styles.header}>
                    <h2 className={styles.title}>Wo ist der Regenbogen ICE?</h2>
                    <h1 className={styles.quickAnswer}>
                        {error ? (
                            <span>
                                Offenbar spurlos verschwunden (
                                {error.toString()})
                            </span>
                        ) : (
                            <>
                                <div
                                    style={{
                                        height: '72px',
                                        width: '70vw',
                                        background: '#fff',
                                        margin: '20px 0',
                                        borderRadius: '10px',
                                    }}
                                ></div>
                                <div
                                    style={{
                                        height: '72px',
                                        width: '40vw',
                                        background: '#fff',
                                        margin: '20px 0',
                                        borderRadius: '10px',
                                    }}
                                ></div>
                            </>
                        )}
                    </h1>
                    <RainbowBand />
                </div>
            </>
        )
    }

    const onArrowClick = () => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
    }

    return (
        <>
            {head}
            <div className={styles.header}>
                <h2 className={styles.title}>Wo ist der Regenbogen ICE?</h2>
                <h1 className={styles.quickAnswer}>
                    <QuickAnswerContent trips={data.trips} />
                </h1>
                <RainbowBand />
                <div className={styles.expandIcon} onClick={onArrowClick}>
                    <svg
                        height="50px"
                        viewBox="0 0 24 24"
                        width="50px"
                        fill="#FFFFFF"
                    >
                        <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
                        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
                    </svg>
                </div>
            </div>
            <TrainDetailsView data={data} />
            <Footer />
        </>
    )
}

function RainbowBand() {
    return (
        <svg
            className={styles.rainbowBandContainer}
            viewBox="0 0 1 6"
            preserveAspectRatio="none"
            shapeRendering="crispEdges"
        >
            <rect x="0" y="0" width="100%" height="1" fill="#e40303" />
            <rect x="0" y="1" width="100%" height="1" fill="#ff8c00" />
            <rect x="0" y="2" width="100%" height="1" fill="#ffed00" />
            <rect x="0" y="3" width="100%" height="1" fill="#008026" />
            <rect x="0" y="4" width="100%" height="1" fill="#004dff" />
            <rect x="0" y="5" width="100%" height="1" fill="#750787" />
        </svg>
    )
}

function QuickAnswerContent({ trips }: { trips: TrainTripData[] }) {
    let trainIndex: number = null

    for (let index = trips.length - 1; index >= 0; index--) {
        const trip = trips[index]

        if (trip.stops.length === 0) continue

        const lastStopTime = trip.stops[trip.stops.length - 1].arrival

        if (lastStopTime !== null) {
            if (
                DateTime.fromISO(lastStopTime, { zone: 'UTC' }) > DateTime.now()
            ) {
                trainIndex = index
                break
            }
        }
    }

    if (trainIndex === null) {
        return (
            <>
                {trips.length !== 0 ? (
                    <span>
                        Zuletzt gesehen als{' '}
                        <b>
                            {trips[0].train_type +
                                '\xa0' +
                                trips[0].train_number}
                        </b>{' '}
                        in <b>{trips[0].destination_station}</b>
                    </span>
                ) : null}
            </>
        )
    } else {
        return (
            <>
                {doesIceStartInFuture(trips[trainIndex])
                    ? makeIceStartTimeMessage(trips[trainIndex])
                    : 'Jetzt gerade als'}{' '}
                <b>
                    {trips[trainIndex].train_type +
                        '\xa0' +
                        trips[trainIndex].train_number}
                </b>{' '}
                zwischen <b>{trips[trainIndex].origin_station}</b> und{' '}
                <b>{trips[trainIndex].destination_station}</b>
            </>
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

    if (firstDepartureTime.toLocal() > DateTime.now().endOf('day')) {
        // if first departure is after today
        if (
            firstDepartureTime.toLocal() >
            DateTime.now().plus({ days: 1 }).endOf('day')
        ) {
            // if first departure is after tomorrow
            dateText =
                'dem ' +
                firstDepartureTime.toLocal().toFormat('dd.mm.') +
                ' um '
        } else {
            dateText = 'morgen um '
        }
    }

    return (
        'Ab ' +
        dateText +
        firstDepartureTime.toLocal().toFormat('HH:mm') +
        ' als'
    )
}

function getFirstDepartureTime(trainTrip: TrainTripData): DateTime {
    if (!trainTrip.stops || !trainTrip.stops[0].departure) {
        return null
    }

    const firstDeparture = trainTrip.stops[0].departure
    return DateTime.fromISO(firstDeparture, { zone: 'UTC' })
}
