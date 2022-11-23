import { DateTime } from 'luxon'
import { useRouter } from 'next/router'
import { SyntheticEvent } from 'react'
import styled from 'styled-components'
import { Button } from '../components/layout/styles'
import Footer from '../components/misc/Footer'
import { TrainType } from '../util/commonTypes'
import { getTrainTripLink } from '../util/trainDataUtil'

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;

    padding: 2rem;
`

const PageTitle = styled.h1`
    margin-top: 50px;
    margin-bottom: 20px;
`

const InputElement = styled.input`
    padding: 20px;
    box-sizing: border-box;
    max-width: 450px;

    margin-bottom: 15px;
    margin-top: 7px;

    font-size: 16px;
    border-radius: 15px;
`

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
`

const InputLabel = styled.label`

`

export default function SearchTripPage() {
    const router = useRouter()

    function onSubmit(e: SyntheticEvent) {
        e.preventDefault()

        const formData = new FormData(e.nativeEvent.target as HTMLFormElement)

        const trainNumber = formData.get('trainNumber') as string
        const [type, number] = trainNumber.toUpperCase().split(' ')

        const time = formData.get('time') as string + ' ' + formData.get('date') as string
        const formattedTime = DateTime.fromFormat(time, 'HH:mm yyyy-MM-dd', {zone: 'local'}).toISO({includeOffset: true})
        
        const link = getTrainTripLink(type as TrainType, parseInt(number), formattedTime)
        router.push(link)
    }

    return (
        <>
            <PageContainer>
                <FormContainer onSubmit={onSubmit}>
                    <PageTitle>Zugsuche</PageTitle>
                    <InputLabel>Zugnummer</InputLabel>
                    <InputElement name="trainNumber" type="text" placeholder="Bspw. ICE 123" required />
                    <InputLabel>Datum</InputLabel>
                    <InputElement name="date" type="date" required />
                    <InputLabel>Zeit</InputLabel>
                    <InputElement name="time" type="time" required />
                    <InputElement type="submit" />
                </FormContainer>
            </PageContainer>
            <Footer />
        </>
    )
}
