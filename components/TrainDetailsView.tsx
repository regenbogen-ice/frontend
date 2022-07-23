import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import { RAINBOWNAME, RAINBOWTZN } from '../scripts/constants'
import {
    AutoCompleteResult,
    fetchFromAPI,
    TrainTripData,
    TrainVehicleData,
} from '../scripts/dataSources'
import { DateTime } from 'luxon'
import TrainHistoryView from './TrainHistoryView'
import styles from '../styles/TrainDetailsView.module.css'

function TrainSearch() {
    const router = useRouter()

    const [text, setText] = useState('')
    const [focused, setFocused] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(false)

    const { data, error }: { data?: AutoCompleteResult; error?: Error } =
        useSWR(text ? [text, 'autocomplete'] : null, fetchFromAPI, {
            refreshInterval: 0,
        })

    const searchBox = useRef<HTMLInputElement>()

    useEffect(() => {
        const id = setTimeout(() => {
            setShowSuggestions(focused) // dirty workaround; don't use!
        }, 50)

        return () => clearTimeout(id)
    }, [focused])

    function search(searchTerm: string) {
        if (searchTerm === '') return

        if (
            searchTerm === RAINBOWTZN ||
            searchTerm.toLowerCase() === RAINBOWNAME.toLowerCase()
        ) {
            router.push('/')
        } else {
            router.push(`/details/${encodeURIComponent(searchTerm)}`)
        }

        setText('')
    }

    function doSearch(e) {
        e.preventDefault()

        if (data && data[0]) {
            search(data[0])
        }
    }

    return (
        <div
            className={styles.searchBar}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onClick={() => searchBox.current && searchBox.current.focus()}
        >
            <form className={styles.searchForm} onSubmit={doSearch}>
                <input
                    className={styles.searchBarInput}
                    ref={searchBox}
                    placeholder="Andere(r) TZN/Zugname?"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></input>
            </form>
            <svg
                className={styles.searchBarIcon}
                onClick={doSearch}
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
            >
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            {data && !error && showSuggestions ? (
                <TrainSearchSugestions
                    searchSuggestions={data}
                    searchMethod={search}
                />
            ) : null}
        </div>
    )
}

function TrainSearchSugestions({
    searchSuggestions,
    searchMethod,
}: {
    searchSuggestions: string[]
    searchMethod: (searchTerm: string) => void
}) {
    return (
        <div className={styles.trainAutoCompleteResults}>
            {searchSuggestions.map((suggestion, index) => (
                <a
                    className={styles.undecoratedLink}
                    key={index}
                    href={'/details/' + encodeURIComponent(suggestion)}
                    onClick={(e) => {
                        e.preventDefault()
                        searchMethod(suggestion)
                    }}
                >
                    <div className={styles.trainAutoCompleteSuggestion}>
                        {suggestion}
                    </div>
                </a>
            ))}
        </div>
    )
}

type TrainStopData = {
    bubble: string
    connections: string
    type: string
    information?: any
}

const toSimpleTimeString = (time) =>
    DateTime.fromISO(time, { zone: 'UTC' }).toLocal().toFormat('HH:mm')

function TrainTimeLabel({ times }: { times: string[] }): JSX.Element {
    const departureTime = DateTime.fromISO(times[times.length - 1], {
        zone: 'UTC',
    })
    const hasDeparted = departureTime > DateTime.now()

    const color = hasDeparted ? '#0275D8' : '#999'
    const timeText = times.map(toSimpleTimeString).join(' - ')

    return (
        <span className={styles.trainTimeSpan} style={{ color }}>
            {timeText}
        </span>
    )
}

function TrainStop({
    bubble,
    connections,
    type,
    information,
}: TrainStopData): JSX.Element {
    let content = null

    switch (type) {
        case 'LINE_CHANGE':
            content = (
                <span className={styles.trainStopContent}>
                    {information.first || 'Weiter als '}
                    <b>
                        <a
                            className={styles.trainStopLink}
                            href={information.link || null}
                            target="_blank"
                            rel="noreferrer"
                        >
                            ICE {information.line}
                        </a>
                    </b>{' '}
                    nach <b>{information.to}</b>
                </span>
            )
            break

        case 'STATION':
            if (!information) {
                content = (
                    <span className={styles.trainStopContent}>
                        <div
                            style={{
                                width: '18rem',
                                height: '3rem',
                                background:
                                    'linear-gradient(90deg, #aaa 0%, #adadad 100%)',
                                margin: '5px 0',
                                borderRadius: '3rem',
                            }}
                        ></div>
                    </span>
                )
            } else {
                if (information.cancelled) {
                    content = (
                        <span className={styles.trainStopContent}>
                            <s>{information.name}</s>
                        </span>
                    )
                } else {
                    const times = [
                        information.arrival,
                        information.departure,
                    ].filter((x) => x)

                    content = (
                        <span className={styles.trainStopContent}>
                            {information.name}
                            {times.length > 0 ? (
                                <TrainTimeLabel times={times} />
                            ) : null}
                        </span>
                    )
                }
            }

            break
    }
    return (
        <div className={styles.trainStopContainer}>
            <div className={styles.frontIconContainer}>
                <div
                    className={[
                        styles.connectingLine,
                        connections === 'BOTH' || connections === 'UP'
                            ? styles.up
                            : '',
                        connections === 'BOTH' || connections === 'DOWN'
                            ? styles.down
                            : '',
                    ].join(' ')}
                />
                {bubble === 'LINE_CHANGE' ? (
                    <svg className={styles.trainIcon} viewBox="0 0 24 24">
                        <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm2 0V6h5v4h-5zm3.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                    </svg>
                ) : (
                    <div
                        className={[
                            styles.frontCircle,
                            bubble === 'BIG' ? styles.large : '',
                        ].join(' ')}
                    />
                )}
                {information.blueDot !== undefined ? (
                    <div
                        className={styles.blueDot}
                        style={{ top: information.blueDot + '%' }}
                    />
                ) : null}
            </div>
            {content}
        </div>
    )
}

function isTripObsolete(trip: TrainTripData): boolean {
    return (
        DateTime.fromISO(trip.stops[trip.stops.length - 1].arrival, {
            zone: 'UTC',
        }).plus({ minutes: 30 }) < DateTime.now()
    )
}

function RealTrainDetailsView({
    data,
}: {
    data: TrainVehicleData
}): JSX.Element {
    // dirty rerender loop dont use
    const [random, setRandom] = useState(0)
    useEffect(() => {
        setTimeout(() => setRandom(performance.now()), 1000)
    }, [random])

    const trips = [...data.trips]
        .reverse()
        .filter((trip) => !(trip.stops.length === 0 || isTripObsolete(trip)))

    const stops: TrainStopData[] = trips
        .map((trip, index) => {
            const lineChange = {
                bubble: 'LINE_CHANGE',
                connections: 'BOTH',
                type: 'LINE_CHANGE',
                information: {
                    line: trip.train_number,
                    to: trip.destination_station,
                    link: trip.marudor,
                    first: index === 0,
                },
            }

            const stations = trip.stops.map((stop, stopindex) => {
                return {
                    bubble:
                        stopindex === 0 || stopindex === trip.stops.length - 1
                            ? 'BIG'
                            : 'DEFAULT',
                    connections: 'BOTH',
                    type: 'STATION',
                    information: {
                        name: stop.station,
                        arrival: stop.arrival,
                        departure: stop.departure,
                        cancelled: stop.cancelled,
                    },
                }
            })

            return [lineChange, ...stations]
        })
        .flat()

    if (stops.length >= 2) {
        stops[0].connections = 'DOWN'
        stops[stops.length - 1].connections = 'UP'
    }

    for (let index = 0; index < stops.length; index++) {
        const stop = stops[index]
        if (stop.type === 'STATION') {
            const times = [
                stop.information?.arrival,
                stop.information?.departure,
            ].filter((x) => x)
            const startTime = DateTime.fromISO(times[0], {
                zone: 'UTC',
            }).toLocal()

            if (startTime > DateTime.now()) {
                // find the first stop where the train has not arrived yet
                const lastStop = stops[index - 1]

                if (lastStop.type !== 'STATION') {
                    // the train starts here
                    if (startTime < DateTime.now().plus({ minutes: 15 })) {
                        stop.information!.blueDot = 50
                    }
                } else {
                    const lastStopDeparture = DateTime.fromISO(
                        lastStop.information?.departure,
                        { zone: 'UTC' }
                    ).toLocal()

                    if (lastStopDeparture > DateTime.now()) {
                        // if train has not departed from the last station
                        lastStop.information.blueDot = 50
                    } else {
                        const total =
                            lastStopDeparture.toUnixInteger() -
                            startTime.toUnixInteger()
                        const current =
                            lastStopDeparture.toUnixInteger() -
                            DateTime.now().toUnixInteger()
                        const percentage = (current * 100) / total

                        if (percentage > 50) {
                            stop.information.blueDot = percentage - 50
                        } else {
                            lastStop.information.blueDot = percentage + 50
                        }
                    }
                }

                break
            }
        }
    }

    return (
        <section className={styles.root}>
            <div className={styles.titleBar}>
                <div>
                    <h1 className={styles.title}>Fahrtverlauf</h1>
                    <div className={styles.subtitle}>
                        {data.name
                            ? 'Zugname "' + data.name + '"'
                            : 'Kein Zugname'}{' '}
                        (Tzn {data.number}, BR{data.building_series})
                    </div>
                </div>
                <TrainSearch />
            </div>
            <div className={styles.trainStopsContainer}>
                {stops.map((value, index) => {
                    return <TrainStop key={index} {...value} />
                })}
                {stops.length === 0 && (
                    <span className={styles.noTrainStops}>
                        Keine Daten verfügbar :c
                    </span>
                )}
            </div>
            <TrainHistoryView basicData={data} />
        </section>
    )
}

export default function ProxyTrainDetailsView({
    data,
}: {
    data: TrainVehicleData | null
}): JSX.Element {
    if (data) {
        return <RealTrainDetailsView data={data} />
    }

    return null
}
