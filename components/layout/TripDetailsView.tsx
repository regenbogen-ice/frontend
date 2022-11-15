import { DateTime } from 'luxon'
import Link from 'next/link'
import { useMemo } from 'react'
import { TrainTrip, TrainVehicle } from '../../util/commonTypes'
import { getTrainVehicleLink } from '../../util/trainDataUtil'
import { ExternalLink } from '../misc/CommonComponents'
import { InternalLink } from '../misc/CommonStyles'
import FullTimetable from '../timetable/CompleteTripTimetable'
import { DetailsContainer, InfoTitle, InfoValue, SectionTitle, SectionWrapper } from './styles'

export function TripDate({initialDeparture}: {initialDeparture: string}) {
    const formattedDate = useMemo(() => (
        DateTime.fromISO(initialDeparture).toFormat('dd.MM.yyyy')
    ), [initialDeparture])

    return (
        <h3>{formattedDate}</h3>
    )
}

export function TrainVehicleInfo({vehicles}: {vehicles: TrainVehicle[]}) {
    
    return (
        <>
            <InfoTitle>{vehicles.length > 1 ? 'Triebfahrzeuge' : 'Triebfahrzeug'}</InfoTitle>
            <InfoValue>
                {vehicles.map(vehicle => {
                    return (
                        <Link key={vehicle.train_vehicle_number} href={getTrainVehicleLink(vehicle.train_type, String(vehicle.train_vehicle_number))} passHref legacyBehavior>
                            <InternalLink>{vehicle.train_vehicle_name || `Tz ${vehicle.train_vehicle_number}`}</InternalLink>
                        </Link>
                    )
                })}
                {vehicles.length === 0 && (
                    <>-</>
                )}
            </InfoValue>
        </>
    )
}

export default function TripDetailsView({currentTrip, vehicles}: {currentTrip: TrainTrip, vehicles: TrainVehicle[]}) {
    return (
        <>
            <DetailsContainer>
                <SectionWrapper>
                    <SectionTitle>Fahrtverlauf</SectionTitle>
                    <TripDate initialDeparture={currentTrip.initial_departure} />
                    <FullTimetable trainTrip={currentTrip} />
                </SectionWrapper>
                <SectionWrapper>
                    <SectionTitle>Zugdetails</SectionTitle>
                    <TrainVehicleInfo vehicles={vehicles} />
                    {currentTrip.bahn_expert && (
                        <InfoValue>
                            <ExternalLink text={'bahn.expert'} link={currentTrip.bahn_expert} />
                        </InfoValue>
                    )}
                </SectionWrapper>
            </DetailsContainer>
        </>
    )
}
