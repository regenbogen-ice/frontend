import { useRouter } from 'next/router'
import TripDetailsView from '../../../components/layout/TripDetailsView'
import { HtmlTitle, NoDataComponent } from '../../../components/misc/CommonComponents'
import { HeaderContainer } from '../../../components/misc/CommonStyles'
import Header from '../../../components/misc/Header'
import SearchBox from '../../../components/search/SearchBox'
import { TrainTrip, TrainType } from '../../../util/commonTypes'
import { useRerenderPeriodically, useTrainTrips } from '../../../util/hooks'

export default function VehicleParameterWaitingView() {
    const router = useRouter()
    const { trainNumber, trainType } = router.query
    
    if(!trainType || !trainNumber) {
        return null
    }

    return (
        <Trip 
            trainNumber={trainNumber as string}
            trainType={trainType as string}
            initialDeparture={router.query.initialDeparture as string || null}
        />
    )
}

function Trip({trainNumber, trainType, initialDeparture}: {trainNumber: string, trainType: string, initialDeparture: string | null}) {
    useRerenderPeriodically(3000)

    const { data, error } = useTrainTrips(Number(trainNumber), trainType as TrainType, initialDeparture)
    if(error || !data) {
        return <NoDataComponent error={error} title={`${trainType} ${trainNumber}`} />
    }
    
    const currentTrip = data[0]

    return (
        <>
            <HtmlTitle title={`${currentTrip.train_type} ${currentTrip.train_number}`} />
            <Header />
            <TripHeader trainTrip={currentTrip} />
            <TripDetailsView currentTrip={currentTrip} vehicles={currentTrip.train_vehicles || []} />
        </>
    )
}

function TripHeader({trainTrip}: {trainTrip: TrainTrip}) {
    return (
        <HeaderContainer>
            <h1>{trainTrip.train_type} {trainTrip.train_number}</h1>
            <h2>{trainTrip.origin_station} {'->'} {trainTrip.destination_station}</h2>
            <SearchBox />
        </HeaderContainer>
    )
}
