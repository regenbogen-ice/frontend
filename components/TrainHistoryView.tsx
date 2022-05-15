import styled from 'styled-components'
import useSWR from 'swr'
import { fetchFromAPI, TrainTripData, TrainVehicleData } from '../scripts/dataSources'
import { DateTime } from 'luxon'
import { useState } from 'react'
import type { SyntheticEvent } from 'react'

const HistoryContainer = styled.div`
    display: flex;
    margin: 5rem 0;
    flex-direction: column;
`

const Subtitle = styled.h2`
    font-size: 3rem;
    margin-bottom: 1rem;
`

const DaysContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const DayContainer = styled.div`
    margin: 2rem 1rem;
    width: min(500px, 100%);
`

const DayTitle = styled.h3`
    font-size: 2.75rem;
`

const TrainRoute = styled.span`
    font-size: 2rem;
    display: block;
    margin: 1rem 0;
`

const CenterContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;
`

const ShowMore = styled.a`
    margin: auto;
    font-size: 20px;
    background-color: #ff5eab11;
    padding: 10px 20px;
    text-decoration: none;
    color: #ff5eab;
    border-radius: 4px;
    transition: background-color .2s;
    font-weight: bold;
    :hover {
        background-color: #ff5eab33;
    }
`

export default function TrainHistoryView({basicData}: {basicData: TrainVehicleData}) {
    const { data, error }: { data?: TrainVehicleData, error?: Error } = useSWR([basicData.number, 'history'], fetchFromAPI)
    const [limitResults, setLimitResults] = useState(true)

    const showMore = (e: SyntheticEvent) => {
        e.preventDefault()
        
        setLimitResults(false)
    }
    
    if(data && !error) {
        const days = {}

        data.trips.forEach(tfz => {
            const time = DateTime.fromISO(tfz.initial_departure).toLocal()

            const date = time.toFormat('dd.MM.yyyy')
            if(!days[date]) days[date] = []
            days[date].push(tfz)
        })

        Object.keys(days).forEach(day => days[day].reverse())

        let daysArr = Object.entries(days)
        
        if(limitResults) {
            daysArr = daysArr.slice(0,6)
        }

        return (
            <HistoryContainer>
                <Subtitle>Historische Daten</Subtitle>
                <CenterContainer>
                    <DaysContainer>
                        {daysArr.map(([day, tfzs]) => {
                            return <DayContainerView key={day} day={day} data={tfzs as any} />
                        })}
                    </DaysContainer>
                    {limitResults ? (
                        <ShowMore href="#" onClick={showMore}>Mehr anzeigen</ShowMore>
                    ) : null}
                </CenterContainer>
            </HistoryContainer>
        )
    }

    return null
}

function DayContainerView({day, data}: {day: string, data: TrainTripData[]}) {
    return (
        <DayContainer>
            <DayTitle>{day}</DayTitle>
            {data.map((route, index) => {
                return <TrainRouteView key={index} route={route} />
            })}
        </DayContainer>
    )
}

function TrainRouteView({route}: {route: TrainTripData}) {
    return (
        <TrainRoute><b>ICE {route.train_number}</b>: {route.origin_station} {'->'} {route.destination_station}</TrainRoute>
    )
}
