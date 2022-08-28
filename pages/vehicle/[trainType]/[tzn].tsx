import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Header from '../../../components/misc/Header'
import Loader from '../../../components/misc/Loader'
import SearchBox from '../../../components/search/SearchBox'
import TrainDetailsView from '../../../components/layout/TrainDetailsView'
import { TrainTrip, TrainType, TrainVehicle } from '../../../util/commonTypes'
import { useRerenderPeriodically, useTrainVehicleCurrent } from '../../../util/hooks'
import { findCurrentTrip, generateTripHeadline } from '../../../util/trainDataUtil'
import { FullScreenError } from '../../../components/misc/Error'
import { HeaderContainer } from '../../../components/misc/CommonStyles'

const ErrorContainer = styled.div`
    width: 100vw;
    height: 100vh;
    
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    padding: 20px;
    box-sizing: border-box;
`

export default function VehicleParameterWaitingView() {
    const router = useRouter()
    const { tzn, trainType } = router.query
    
    if(!trainType) {
        return null
    }

    return (
        <Vehicle tzn={tzn as string} trainType={trainType as string} />
    )
}

function Vehicle({tzn, trainType}: {tzn: string, trainType: string}) {
    useRerenderPeriodically(3000)

    const { data, error } = useTrainVehicleCurrent(tzn, trainType as TrainType)

    const noUseableData = error || !data

    const head = (
        <Head>
            <title>{`Wo ist das ${trainType} Tfz ${tzn}?`}</title>
        </Head>
    )

    if(error) {
        return (
            <>
                {head}
                <FullScreenError error={error} />
            </>
        )
    }

    if(noUseableData) {
        return (
            <>
                {head}
                <ErrorContainer>
                    <Loader />
                </ErrorContainer>
            </>
        )
    }

    const trainTrip = findCurrentTrip(data)

    return (
        <>
            {head}
            <Header />
            <VehicleHeader trainTrip={trainTrip} trainVehicle={data} />
            <TrainDetailsView vehicle={data} currentTrip={trainTrip} />
        </>
    )
}

function VehicleHeader({trainTrip, trainVehicle}: {trainTrip: TrainTrip, trainVehicle: TrainVehicle}) {
    const tripHeadline: string = generateTripHeadline(trainTrip)

    return (
        <HeaderContainer>
            <h1>Wo ist der {trainVehicle.train_type} {trainVehicle.train_vehicle_name || 'Tz ' + trainVehicle.train_vehicle_number}?</h1>
            <h2>{tripHeadline}</h2>
            <SearchBox />
        </HeaderContainer>
    )
}
