import { DateTime } from 'luxon'
import Link from 'next/link'
import { useMemo } from 'react'
import { Coach, TrainTrip } from '../../util/commonTypes'
import { getTrainTripLink } from '../../util/trainDataUtil'
import { InternalLink } from '../misc/CommonStyles'
import MultiTimetable from '../timetable/MultiTripTimetable'
import { CoachEnumValue, DetailsContainer, InfoTitle, InfoValue, SectionTitle, SectionWrapper } from './styles'
import { TrainVehicleInfo } from './TripDetailsView'

export function Date({initialDeparture}: {initialDeparture: string}) {
    const formattedDate = useMemo(() => (
        DateTime.fromISO(initialDeparture).toFormat('dd.MM.yyyy')
    ), [initialDeparture])

    return (
        <>{formattedDate}</>
    )
}

function TripInfo({trip}: {trip: TrainTrip}) {
    return (
        <>
            <InfoTitle>Letzte Zugfahrt</InfoTitle>
            <InfoValue>
                <Date initialDeparture={trip.initial_departure} />
                <Link href={getTrainTripLink(trip.train_type, trip.train_number, trip.initial_departure)} passHref legacyBehavior>
                    <InternalLink>{trip.train_type} {trip.train_number}</InternalLink>
                </Link>
            </InfoValue>
        </>
    )
}
export default function CoachDetailsView({coach}: {coach: Coach}) {
    const trip = coach.coach_links[0]?.trip
    
    const vehicles = []
    if(coach?.coach_sequence?.train_vehicle) vehicles.push(coach.coach_sequence.train_vehicle)
    
    return (
        <>
            <DetailsContainer>
                <SectionWrapper>
                    <SectionTitle>Fahrtverlauf</SectionTitle>
                    <MultiTimetable trainTrips={[trip]} cutoffIndex={0} />
                </SectionWrapper>
                <SectionWrapper>
                    <SectionTitle>Wagendetails</SectionTitle>
                    <InfoTitle>Typ</InfoTitle>
                    <CoachEnumValue>{coach.category}</CoachEnumValue>
                    <TripInfo trip={trip} />
                    <TrainVehicleInfo vehicles={vehicles} />
                </SectionWrapper>
            </DetailsContainer>
        </>
    )
}
