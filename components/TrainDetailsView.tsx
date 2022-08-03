import styled from 'styled-components'
import { TrainTrip, TrainVehicle } from '../util/commonTypes'
import { MultiTimetable } from './NodeView'

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
    justify-content: space-evenly;
    flex-wrap: wrap;
    flex-direction: row;
`

const InfoTitle = styled.h2`
    color: #ccc;
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
    flex-direction: row;
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
            </DetailsContainer>
            <HistoryContainer>
                
            </HistoryContainer>
        </>
    )
}
