import { DateTime } from 'luxon'
import Link from 'next/link'
import { TrainTrip } from '../../util/commonTypes'
import { getTrainTripLink } from '../../util/trainDataUtil'
import { UndecoratedInternalLink } from '../misc/CommonStyles'
import { Node } from '../timetable/Node'
import { HistoryEntryContainer, HistoryEntryTitle, HistoryRow, HistoryRowText } from './styles'

export default function HistoryEntry({day, trips}: {day: string, trips: TrainTrip[]}) {
    return (
        <HistoryEntryContainer>
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
                            <Link href={getTrainTripLink(trip.train_type, trip.train_number, trip.initial_departure)} passHref>
                                <UndecoratedInternalLink>
                                    Um {departure} als {trip.train_type} {trip.train_number}
                                    <br/>{trip.origin_station} {'->'}
                                    <br/>{trip.destination_station}
                                </UndecoratedInternalLink>
                            </Link>
                        </HistoryRowText>
                    </HistoryRow>
                )
            })}
        </HistoryEntryContainer>
    )
}
