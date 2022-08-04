import { DateTime } from 'luxon'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { TrainTrip, TrainType, TrainVehicle } from '../util/commonTypes'
import { useTrainVehicleHistory } from '../util/hooks'
import { MultiTimetable, Node } from './NodeView'

const SectionWrapper = styled.div`
    margin: 50px 0;
    padding: 20px;
    width: calc(100% - 6rem);
    max-width: 450px;
`

const SectionTitle = styled.h1`
    margin-bottom: 1em;
`

const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: row;
    column-gap: 10vw;
`

const InfoTitle = styled.h2`
    color: var(--text-dark-color);
    font-size: 1rem;
    margin-bottom: 0.2rem;
`

const InfoValue = styled.p`
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 25px;
`

const HistoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;

    margin: auto;
    
    width: calc(100% - 60px);
    max-width: calc(980px + 10vw);
    padding: 20px;
    box-sizing: border-box;

    margin-bottom: 50px;
`

const HistoryEntries = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
`

const HistoryEntry = styled.div`
    width: 300px;
    margin-bottom: 40px;
    
    display: flex;
    flex-direction: column;
`

const HistoryEntryTitle = styled.h2`
    margin-bottom: 10px;
`

const HistoryRow = styled.div`
    position: relative;
    margin-left: -.5em;

    display: flex;
    align-items: center;
    padding: 12px;
    padding-left: 0;
`

const HistoryRowText = styled.span`
    font-weight: bold;
    margin-left: 2em;
`

const Button = styled.button`
    background-color: var(--text-color);
    align-self: center;
    padding: 10px 50px;
    
    color: var(--theme-color);
    font-family: Inter, sans-serif;
    font-weight: bold;
    font-size: 16px;

    border-radius: 15px;
    cursor: pointer;
`

export function TrainDetailsView({vehicle, currentTrip}: {vehicle: TrainVehicle, currentTrip: TrainTrip}) {
    return (
        <>
            <DetailsContainer>
                <SectionWrapper>
                    <SectionTitle>Fahrtverlauf</SectionTitle>
                    <MultiTimetable trainTrips={vehicle.trips} cutoffIndex={vehicle.trips.indexOf(currentTrip)} />
                </SectionWrapper>
                <SectionWrapper>
                    <SectionTitle>Triebfahrzeug</SectionTitle>
                    <InfoTitle>Zugname</InfoTitle>
                    <InfoValue>{vehicle.name || '-'}</InfoValue>
                    <InfoTitle>Tzn</InfoTitle>
                    <InfoValue>{vehicle.number || '-'}</InfoValue>
                    <InfoTitle>Baureihe</InfoTitle>
                    <InfoValue>{vehicle.building_series || '-'}</InfoValue>
                </SectionWrapper>
                <TrainHistoryView tzn={vehicle.number} trainType={vehicle.train_type as TrainType} />
            </DetailsContainer>
        </>
    )
}

function TrainHistoryView({tzn, trainType}: {tzn: string | number, trainType: TrainType}) {
    const { data, error } = useTrainVehicleHistory(tzn, trainType)
    
    const [reduceItems, setReduceItems] = useState(true)

    const days = useMemo(() => {
        if(!data || error) return null

        const days = {}

        data.trips.forEach(trip => {
            const date = DateTime.fromISO(trip.initial_departure)
            const dateString = date.toFormat('dd.MM.yyyy')
    
            days[dateString] = [
                trip,
                ...(days[dateString] || []),
            ]
        })

        return days
    }, [data, error])

    if(error || !data) {
        return (
            <HistoryContainer>
                <h1>{error ? `Historie kann nicht geladen werden. (${error.toString()})` : 'Lade Historie...'}</h1>
            </HistoryContainer>
        )
    }

    let entries = Object.entries(days)

    if(reduceItems) {
        entries = entries.slice(0,6)
    }

    return (
        <HistoryContainer>
            <h1>Historie</h1>
            <HistoryEntries>
                {entries.map(([day, trips]: [string, TrainTrip[]]) => {
                    return (
                        <HistoryEntry key={day}>
                            <HistoryEntryTitle>{day}</HistoryEntryTitle>
                            {trips.map((trip, index) => {
                                const departure = DateTime.fromISO(trip.initial_departure).toFormat('HH:mm')

                                return (
                                    <HistoryRow key={index}>
                                        <Node 
                                            dot={{color: 'var(--text-color)', size: '1em'}}
                                            top={index === 0 ? null : {type: 'solid', width: '.2em'}}
                                            bottom={index === trips.length - 1 ? null : {type: 'solid', width: '.2em'}} 
                                        />
                                        <HistoryRowText>
                                            Um {departure} als {trip.train_type} {trip.train_number}
                                            <br/>{trip.origin_station} {'->'}
                                            <br/>{trip.destination_station}
                                        </HistoryRowText>
                                    </HistoryRow>
                                )
                            })}
                        </HistoryEntry>
                    )
                })}
            </HistoryEntries>
            {reduceItems ? (
                <Button onClick={() => setReduceItems(false)}>Mehr anzeigen</Button>
            ) : null}
        </HistoryContainer>
    )
}
