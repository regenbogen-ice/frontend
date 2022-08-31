import { useRouter } from 'next/router'
import Header from '../../../components/misc/Header'
import SearchBox from '../../../components/search/SearchBox'
import TrainDetailsView from '../../../components/layout/TrainDetailsView'
import { TrainTrip, TrainType } from '../../../util/commonTypes'
import { useRerenderPeriodically, useTrainVehicleCurrent } from '../../../util/hooks'
import { findCurrentTrip, generateTripHeadline } from '../../../util/trainDataUtil'
import { HeaderContainer } from '../../../components/misc/CommonStyles'
import { HtmlTitle, NoDataComponent } from '../../../components/misc/CommonComponents'
import { REFRESH_INTERVAL } from '../../../util/constants'

export default function VehicleParameterWaitingView() {
    const router = useRouter()
    const { tzn, trainType } = router.query
    
    if(!router.isReady) {
        return <NoDataComponent error={null} title={''} />
    }

    return (
        <Vehicle tzn={tzn as string} trainType={trainType as string} />
    )
}

function Vehicle({tzn, trainType}: {tzn: string, trainType: string}) {
    useRerenderPeriodically(REFRESH_INTERVAL)

    const { data, error } = useTrainVehicleCurrent(tzn, trainType as TrainType)
    if(error || !data) {
        return <NoDataComponent error={error} title={`Wo ist das ${trainType} Tfz ${tzn}?`} />
    }
    const trainTrip = findCurrentTrip(data)

    const pageTitle = `Wo ist der ${data.train_type} ${data.train_vehicle_name || 'Tz ' + data.train_vehicle_number}?`

    return (
        <>
            <HtmlTitle title={pageTitle} />
            <Header />
            <VehicleHeader trainTrip={trainTrip} title={pageTitle} />
            <TrainDetailsView vehicle={data} currentTrip={trainTrip} />
        </>
    )
}

function VehicleHeader({trainTrip, title}: {trainTrip: TrainTrip, title: string}) {
    const tripHeadline: string = generateTripHeadline(trainTrip)

    return (
        <HeaderContainer>
            <h1>{title}</h1>
            <h2>{tripHeadline}</h2>
            <SearchBox />
        </HeaderContainer>
    )
}
