import { TrainTrip, TrainType, TrainVehicle } from '../../util/commonTypes'
import MultiTimetable from '../timetable/MultiTripTimetable'
import { DetailsContainer, InfoTitle, InfoValue, SectionTitle, SectionWrapper } from './styles'
import TrainHistoryView from './TrainHistoryView'

export default function TrainDetailsView({vehicle, currentTrip}: {vehicle: TrainVehicle, currentTrip: TrainTrip}) {
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
                    <InfoTitle>Triebzugnummer</InfoTitle>
                    <InfoValue>{vehicle.number || '-'}</InfoValue>
                    <InfoTitle>Baureihe</InfoTitle>
                    <InfoValue>{vehicle.building_series || '-'}</InfoValue>
                </SectionWrapper>
                <TrainHistoryView tzn={vehicle.number} trainType={vehicle.train_type as TrainType} />
            </DetailsContainer>
        </>
    )
}
