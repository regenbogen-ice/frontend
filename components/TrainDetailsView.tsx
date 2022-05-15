import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import useSWR from 'swr'
import { RAINBOWNAME, RAINBOWTZN } from '../scripts/constants'
import { AutoCompleteResult, fetchFromAPI, TrainTripData, TrainVehicleData } from '../scripts/dataSources'
import { Skeleton } from './Common'
import { DateTime } from 'luxon'
import TrainHistoryView from './TrainHistoryView'


const Root =  styled.section`
    padding: 6rem;
    min-height: calc(100vh - 12rem);
    @media only screen and (max-width: 600px) {
        padding: 3rem;
        padding-bottom: 8rem;
        min-height: calc(100vh - 6rem);
    }
`

const TitleBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    @media only screen and (max-width: 1000px) {
        flex-direction: column;
    }
`

const TitleContainer = styled.div``

const Title = styled.h1`
    font-size: 3.5rem;
`

const Subtitle = styled.div`
    font-size: 1.25rem;
`

const SearchBar = styled.div`
    padding: 15px 25px;
    margin: 15px;
    border-radius: 25px;
    box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.15);
    cursor: text;
    display: flex;
    @media only screen and (max-width: 1000px) {
        margin: 25px 0;
    }
    flex-grow: 1;
    max-width: 300px;
    position: relative;
`

const SearchBarIcon = styled.svg`
    cursor: pointer;
`

const SearchForm = styled.form`
    flex-grow: 1;
    position: relative;
`

const SearchBarInput = styled.input`
    font-size: 20px;
    width: 100%;
    font-familiy: "Roboto", sans-serif;
`

const TrainStopsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 3rem 0;
    align-items: flex-start;
`

const TrainStopContainer = styled.div`
    font-size: 2.75rem;
    display: flex;
    align-items: center;
    position: relative;
`

const FrontIconContainer = styled.div`
    display: flex;
    height: 3.5rem;
    width: 3.5rem;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
`

const TrainStopContent = styled.span`
    margin-left: 3rem;
    margin-bottom: .5rem;
    margin-top: .5rem;
    word-break: break-word;
`
/* eslint-disable */
const FrontCircle: any = styled.div`
    background: #FF007A;
    width: 2.5rem;
    height: 2.5rem;
    ${(props: any) => props.large && css`
        width: 3.5rem;
        height: 3.5rem;
        background: #FF3395;
    `}
    border-radius: 50%;
    z-index: 2;
`
/* eslint-enable */

const TrainIcon = styled.svg`
    width: 2.5rem;
    height: 2.5rem;
    fill: #DF2350;
    z-index: 2;
`

/* eslint-disable */
const ConnectingLine: any = styled.div`
    background: #FF007A;
    position: absolute;
    top: 50%;
    bottom: 50%;
    ${(props: any) => props.up && css`
        top: 0;
    `}
    ${(props: any) => props.down && css`
        bottom: 0;
    `}
    left: 1.65rem;
    width: .2rem;
`
/* eslint-enable */

const StopLink = styled.a`
    color: #0275D8 !important;
`

const TrainTimeSpan = styled.span`
    margin-left: 1rem;
    word-break: break-word;
`

const TrainAutoCompleteResults = styled.div`
    position: absolute;
    width: 100%;
    background-color: #fff;
    top: calc(100% + 4px);
    left: 0;
    box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.15);
    z-index: 10;
    max-height: 300px;
    overflow-y: auto;
    border-radius: 10px;
    user-select: none;
`

const TrainAutoCompleteSuggestion = styled.div`
    font-size: 20px;
    padding: 8px 12px;
    cursor: pointer;
    transition: .2s;
    :hover {
        background-color: #ddd;
    }
`

const UndecoredLink = styled.a`
    text-decoration: none;
    color: inherit;
`

const NoTrainStops = styled.span`
    font-size: 2rem;
    font-weight: bold;
`

const BlueDot = styled.div`
    background-color: #426BFF;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: .3rem solid white;
    position: absolute;
    z-index: 10;
    margin-left: 1px;
    margin-top: -1.3rem;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`

function TrainSearch() {
    const router = useRouter()

    const [text, setText] = useState('')
    const [focused, setFocused] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(false)

    const { data, error }: { data?: AutoCompleteResult, error?: Error } = useSWR(text ? [text, 'autocomplete'] : null, fetchFromAPI, { refreshInterval: 0 })
    
    const searchBox = useRef<HTMLInputElement>()
    
    useEffect(() => {
        const id = setTimeout(() => {
            setShowSuggestions(focused) // dirty workaround; don't use!
        }, 50)

        return () => clearTimeout(id)
    }, [focused])

    function search(searchTerm: string) {
        if(searchTerm === '') return

        if(searchTerm === RAINBOWTZN || searchTerm.toLowerCase() === RAINBOWNAME.toLowerCase()) {
            router.push('/')
        } else {
            router.push(`/details/${encodeURIComponent(searchTerm)}`)
        }

        setText('')
    }

    function doSearch(e) {
        e.preventDefault()

        if(data && data[0]) {
            search(data[0])
        }
    }

    return (
        <SearchBar onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onClick={() => searchBox.current && searchBox.current.focus()}>
            <SearchForm onSubmit={doSearch}>
                <SearchBarInput ref={searchBox}  placeholder='Andere TZN/Zugname?' type='text' value={text} onChange={e => setText(e.target.value)}></SearchBarInput>
            </SearchForm>
            <SearchBarIcon onClick={doSearch} height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></SearchBarIcon>
            {data && !error && showSuggestions ?
                <TrainSearchSugestions searchSuggestions={data} searchMethod={search} />
            : null}
        </SearchBar>
    )
}

function TrainSearchSugestions({searchSuggestions, searchMethod}: {searchSuggestions: string[], searchMethod: (searchTerm: string) => void}) {
    return (
        <TrainAutoCompleteResults>
            {searchSuggestions.map((suggestion, index) => (
                <UndecoredLink key={index} href={'/details/'+encodeURIComponent(suggestion)} onClick={e => {
                    e.preventDefault()
                    searchMethod(suggestion)
                }}>
                    <TrainAutoCompleteSuggestion>{suggestion}</TrainAutoCompleteSuggestion>
                </UndecoredLink>
            ))}
        </TrainAutoCompleteResults>
    )
}

type TrainStopData = {bubble: string, connections: string, type: string, information?: any}

const toSimpleTimeString = (time) => DateTime.fromISO(time, {zone: 'UTC'}).toLocal().toFormat('HH:mm')

function TrainTimeLabel({times}: {times: string[]}): JSX.Element {
    const departureTime = DateTime.fromISO(times[times.length-1], {zone: 'UTC'})
    const hasDeparted = departureTime > DateTime.now()

    const color = hasDeparted ? '#0275D8' : '#999'
    const timeText = times.map(toSimpleTimeString).join(' - ')

    return (
        <TrainTimeSpan style={{color}}>{timeText}</TrainTimeSpan>
    )
}

function TrainStop({bubble, connections, type, information}: TrainStopData): JSX.Element {
    let content = null

    switch(type) {

        case 'LINE_CHANGE':
            content = (
                <TrainStopContent>{information.first || 'Weiter als '}<b><StopLink href={information.link || null} target='_blank' rel='noreferrer'>ICE {information.line}</StopLink></b> nach <b>{information.to}</b></TrainStopContent>
            )
            break

        case 'STATION':
            if(!information) {
                content = (
                    <TrainStopContent>
                        <Skeleton style={{width: '18rem', height: '3rem', margin: '5px 0', borderRadius: '3rem'}} />
                    </TrainStopContent>
                )
            } else {
                if(information.cancelled) {
                    content = (
                        <TrainStopContent>
                            <s>{information.name}</s>
                        </TrainStopContent>
                    )
                } else {
                    const times = [information.arrival, information.departure].filter(x=>x)

                    content = (
                        <TrainStopContent>
                            {information.name}
                            {times.length > 0 ? <TrainTimeLabel times={times} /> : null}
                        </TrainStopContent>
                    )
                }
                
            }
            
            break
    }
    return (
        <TrainStopContainer>
            <FrontIconContainer>
                <ConnectingLine up={connections === 'BOTH' || connections === 'UP'} down={connections === 'BOTH' || connections === 'DOWN'} />
                {bubble === 'LINE_CHANGE' ? (
                    <TrainIcon viewBox="0 0 24 24"><path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm2 0V6h5v4h-5zm3.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></TrainIcon>
                ) : (
                    <FrontCircle large={bubble === 'BIG'}/>
                )}
                {information.blueDot !== undefined ? <BlueDot style={{top: information.blueDot + '%'}} /> : null}
            </FrontIconContainer>
            {content}
        </TrainStopContainer>
    )
}

function isTripObsolete(trip: TrainTripData): boolean {
    return DateTime.fromISO(trip.stops[trip.stops.length - 1].arrival, { zone: 'UTC' }).plus({minutes: 30}) < DateTime.now()
}

function RealTrainDetailsView({data}: {data: TrainVehicleData}): JSX.Element {
    // dirty rerender loop dont use
    const [random, setRandom] = useState(0)
    useEffect(() => {
        setTimeout(() => setRandom(performance.now()), 1000)
    }, [random])

    const trips = [...data.trips].reverse()
        .filter(trip => !(trip.stops.length === 0 || isTripObsolete(trip)))

    const stops: TrainStopData[] = trips.map((trip, index) => {
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
                bubble: (stopindex === 0 || stopindex === trip.stops.length - 1) ? 'BIG' : 'DEFAULT',
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
    }).flat()

    if(stops.length >= 2) {
        stops[0].connections = 'DOWN'
        stops[stops.length - 1].connections = 'UP'
    }

    for(let index = 0; index < stops.length; index++) {
        const stop = stops[index]
        if(stop.type === 'STATION') {
            const times = [stop.information?.arrival, stop.information?.departure].filter(x=>x)
            const startTime = DateTime.fromISO(times[0], { zone: 'UTC' }).toLocal()
            
            if(startTime > DateTime.now()) { // find the first stop where the train has not arrived yet
                const lastStop = stops[index - 1]
                
                if(lastStop.type !== 'STATION') { // the train starts here
                    if(startTime < DateTime.now().plus({minutes: 15})) {
                        stop.information!.blueDot = 50
                    }
                } else {
                    const lastStopDeparture = DateTime.fromISO(lastStop.information?.departure, { zone: 'UTC' }).toLocal()

                    if(lastStopDeparture > DateTime.now()) { // if train has not departed from the last station
                        lastStop.information.blueDot = 50
                    } else {
                        const total = lastStopDeparture.toUnixInteger() - startTime.toUnixInteger()
                        const current = lastStopDeparture.toUnixInteger() - DateTime.now().toUnixInteger()
                        const percentage = current * 100 / total

                        if(percentage > 50) {
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
        <Root>
            <TitleBar>
                <TitleContainer>
                    <Title>Fahrtverlauf</Title>
                    <Subtitle>{data.name ? 'Zugname "' + data.name + '"' : 'Kein Zugname'} (Tzn {data.number}, BR{data.building_series})</Subtitle>
                </TitleContainer>
                <TrainSearch />
            </TitleBar>
            <TrainStopsContainer>
                {stops.map((value, index) => {
                    return <TrainStop key={index} {...value} />
                })}
                {stops.length === 0 && (
                    <NoTrainStops>Keine Daten verfügbar :c</NoTrainStops>
                )}
            </TrainStopsContainer>
            <TrainHistoryView basicData={data} />
        </Root>
    )
}

export default function ProxyTrainDetailsView({data}: {data: TrainVehicleData | null}): JSX.Element {
    if(data) {
        return <RealTrainDetailsView data={data} />
    }
    
    return null
}
