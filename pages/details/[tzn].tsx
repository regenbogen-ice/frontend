import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'
import TrainDetailsView from '../../components/TrainDetailsView'
import { RAINBOWNAME, RAINBOWTZN } from '../../scripts/constants'
import { fetchFromAPI } from '../../scripts/dataSources'
import Head from 'next/head'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

export default function TrainDetailsStandalone(): JSX.Element {
    const router = useRouter()
    const { tzn } = router.query
    const tznString = String(tzn)

    const { data, error } = useSWR(tzn !== undefined ? [tznString, 'trainTrip'] : null, fetchFromAPI)

    useEffect(() => {
        if(tznString === RAINBOWTZN
            || tznString.toLowerCase() === RAINBOWNAME.toLowerCase()
            || String(Number(tznString)) === RAINBOWTZN) {
            router.push('/')
        }
    }, [tznString, router])

    const head = (
        <Head>
            <title>Wo ist das Triebfahrzeug {(data && data.zugname) || tzn}?</title>
        </Head>
    )

    if(error) {
        return (
            <h1>{error.message}</h1>
        )
    }

    return (
        <>
            {head}
            <Header />
            <TrainDetailsView data={data} />
            <Footer />
        </>
    )
}
