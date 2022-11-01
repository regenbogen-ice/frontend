import { TrainTrip, TrainType, TrainVehicle } from '../../util/commonTypes'
import MultiTimetable from '../timetable/MultiTripTimetable'
import { DetailsContainer, InfoTitle, InfoValue, SectionTitle, SectionWrapper } from './styles'
import TrainHistoryView from './TrainHistoryView'

function getVehicleType(vehicle: TrainVehicle) {
    if(vehicle.building_series_name) return vehicle.building_series_name
    if(vehicle.building_series) return `Baureihe ${vehicle.building_series}`
    return '-'
}

export default function TrainDetailsView({vehicle, currentTrip}: {vehicle: TrainVehicle, currentTrip: TrainTrip}) {
    if(!vehicle.trips) return null

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
                    <InfoValue>{vehicle.train_vehicle_name || '-'}</InfoValue>
                    <InfoTitle>Triebzugnummer</InfoTitle>
                    <InfoValue>{vehicle.train_vehicle_number || '-'}</InfoValue>
                    <InfoTitle>Zugtyp</InfoTitle>
                    <InfoValue>{getVehicleType(vehicle)}</InfoValue>
                </SectionWrapper>
                <TrainHistoryView tzn={vehicle.train_vehicle_number} trainType={vehicle.train_type as TrainType} />
            </DetailsContainer>
        </>
    )
}
