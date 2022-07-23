import useSWR from 'swr'
import styles from '../styles/TrainHistoryView.module.css'
import {
    fetchFromAPI,
    TrainTripData,
    TrainVehicleData,
} from '../scripts/dataSources'
import { DateTime } from 'luxon'
import { useState } from 'react'
import type { SyntheticEvent } from 'react'

export default function TrainHistoryView({
    basicData,
}: {
    basicData: TrainVehicleData
}) {
    const { data, error }: { data?: TrainVehicleData; error?: Error } = useSWR(
        [basicData.number, 'history'],
        fetchFromAPI
    )
    const [limitResults, setLimitResults] = useState(true)

    const showMore = (e: SyntheticEvent) => {
        e.preventDefault()

        setLimitResults(false)
    }

    if (data && !error) {
        const days = {}

        data.trips.forEach((tfz) => {
            const time = DateTime.fromISO(tfz.initial_departure).toLocal()

            const date = time.toFormat('dd.MM.yyyy')
            if (!days[date]) days[date] = []
            days[date].push(tfz)
        })

        Object.keys(days).forEach((day) => days[day].reverse())

        let daysArr = Object.entries(days)

        if (limitResults) {
            daysArr = daysArr.slice(0, 6)
        }

        return (
            <div className={styles.historyContainer}>
                <h2 className={styles.subtitle}>Historische Daten</h2>
                <div className={styles.centerContainer}>
                    <div className={styles.daysContainer}>
                        {daysArr.map(([day, tfzs]) => {
                            return (
                                <DayContainerView
                                    key={day}
                                    day={day}
                                    data={tfzs as any}
                                />
                            )
                        })}
                    </div>
                    {limitResults ? (
                        <a
                            className={styles.showMore}
                            href="#"
                            onClick={showMore}
                        >
                            Mehr anzeigen
                        </a>
                    ) : null}
                </div>
            </div>
        )
    }

    return null
}

function DayContainerView({
    day,
    data,
}: {
    day: string
    data: TrainTripData[]
}) {
    return (
        <div className={styles.dayContainer}>
            <h3 className={styles.dayTitle}>{day}</h3>
            {data.map((route, index) => {
                return <TrainRouteView key={index} route={route} />
            })}
        </div>
    )
}

function TrainRouteView({ route }: { route: TrainTripData }) {
    return (
        <span className={styles.trainRoute}>
            <b>ICE {route.train_number}</b>: {route.origin_station} {'->'}{' '}
            {route.destination_station}
        </span>
    )
}
