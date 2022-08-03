import styled, { css } from 'styled-components'
import { TrainStop, TrainTrip } from '../util/commonTypes'
import { DateTime } from 'luxon'
import type { ReactNode } from 'react'

function shouldForwardProp(prop: string) {
    return ['children', 'href', 'target'].includes(prop)
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const NodeContainer: any = styled.div.withConfig({ shouldForwardProp })`
    position: absolute;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 2rem;

    ${(props: any) => css`
        left: ${props.offset};
    `}

    shape-rendering: crispedges;
`

const Dot: any = styled.div`
    position: absolute;

    ${(props: any) => css`
        width: ${props.size};
        height: ${props.size};
        background-color: ${props.color};
    `}

    left: 50%;
    transform: translateX(-50%);
    
    border-radius: 50%;
    z-index: 2;
`

const ConnectingLine: any = styled.div.withConfig({ shouldForwardProp })`
    position: absolute;
    width: 0;

    ${(props: any) => css`
        border-left-style: ${props.type};
        border-width: ${props.width};
        border-color: ${props.color};
    `}

    left: 50%;
    transform: translateX(-50%);
`

const TopConnectingLine: any = styled(ConnectingLine)`
    top: 0;

    ${(props: any) => props.type === 'dotted' && css`
        top: ${props.width};
    `}

    height: 50%;
`

const BottomConnectingLine = styled(ConnectingLine)`
    top: 50%;
    height: 50%;
`

const TimetableRowContainer = styled.div`
    position: relative;
    width: 100%;

    display: flex;
    align-items: center;
`

const TimeDisplay: any = styled.span.withConfig({ shouldForwardProp })`
    margin: 15px 0;
    width: calc(5.5em + 15px);
    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: left;

    font-size: 1rem;
    font-weight: bold;

    ${(props: any) => css`
        color: ${props.color};
    `}
`

const BlueDot = styled.div`
    background-color: #426BFF;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: .2rem solid white;
    position: absolute;
    z-index: 10;
    left: 50%;
    margin-left: -0.7rem;
    margin-top: -0.7rem;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`

const StopLabel: any = styled.b.withConfig({ shouldForwardProp })`
    ${(props: any) => css`
        text-decoration: ${props.cancelled ? 'line-through' : ''};
        color: ${props.stopPassed ? 'var(--text-dark-color)' : 'var(--text-color)'}
    `}
`

const TimetableContainer = styled.span`

`

const TripChangeContainer: any = styled.div.withConfig({ shouldForwardProp })`
    display: flex;
    flex-direction: column;
    ${(props: any) => css`
        color: ${props.color}
    `}
`

const TripChangeTop = styled.span`
    font-size: 0.8rem;
    font-weight: bold;
`

const TripChangeBottom: any = styled.a.withConfig({ shouldForwardProp })`
    font-weight: bold;

    ${(props: any) => css`
        color: ${props.color};

        :visited {
            color: ${props.color};
        }
    `}
`
/* eslint-enable @typescript-eslint/no-explicit-any */

type ConnectingLineArgs = {width: string, color?: string, type: string}
type DotArgs = {size: string, color: string}
type NodeArgs = {top?: ConnectingLineArgs, dot: DotArgs, bottom?: ConnectingLineArgs, offset?: string, blueDot?: number}

export function Node({ top, dot, bottom, offset, blueDot }: NodeArgs) {
    return (
        <NodeContainer width={dot.size} offset={offset}>
            {top ? (
                <TopConnectingLine {...top} />
            ) : null}
            <Dot {...dot} />
            {bottom ? (
                <BottomConnectingLine {...bottom} />
            ) : null}
            {typeof blueDot === 'number' ? (
                <BlueDot style={{top: blueDot + '%'}} />
            ) : null}
        </NodeContainer>
    )
}

function TimetableRow({children, time, timeColor, node}: {children?: ReactNode, time?: string, timeColor?: string, node: NodeArgs}) {
    return (
        <TimetableRowContainer>
            <TimeDisplay color={timeColor}>{time || '\xa0'}</TimeDisplay>
            <Node offset={'3.75em'} {...node} />
            {children}
        </TimetableRowContainer>
    )
}

export function TimetableRenderer({rows}: {rows: {stop: TrainStop, index?: number, type: string, time: string, to?: string, marudor?: string}[]}) {
    return (
        <TimetableContainer>
            {rows.map((currentRow, index) => {
                const nextRow = rows[index + 1]
                const lastRow = rows[index - 1]

                
                let bottom = null
                // eslint-disable-next-line prefer-const
                let dot = {size: '1rem', color: 'var(--text-color)'}
                let top = null
                let blueDot: number = null

                if(nextRow) {
                    const color = DateTime.fromISO(nextRow?.stop?.arrival || nextRow.time) < DateTime.now() ? 'var(--text-dark-color)' : 'var(--text-color)'
                    bottom = {type: 'solid', width: '.2rem', color}
                }

                const colorToUse = DateTime.fromISO(currentRow?.stop?.arrival || currentRow.time) < DateTime.now() ? 'var(--text-dark-color)' : 'var(--text-color)'
                dot.color = colorToUse

                if(lastRow) {
                    top = {type: 'solid', width: '.2rem', color: colorToUse}
                }

                if(currentRow.type === 'stop') {

                    if(nextRow?.type === 'stop') {
                        if(nextRow.index !== currentRow.index + 1) {
                            bottom.type = 'dotted'
                        }
                    } else {
                        dot.size = '1.5rem'
                    }

                    if(lastRow?.type === 'stop') {
                        if(lastRow.index !== currentRow.index - 1) {
                            top.type = 'dotted'
                        }
                    } else {
                        dot.size = '1.5rem'
                    }

                    const time = DateTime.fromISO(currentRow.time)
                    const plannedTime = DateTime.fromISO(currentRow.stop.scheduled_departure || currentRow.stop.scheduled_arrival)

                    const stopPassed = time < DateTime.now()

                    const timeString = time.toFormat('HH:mm')
                    let timeColor = colorToUse

                    if(!stopPassed && time > plannedTime.plus(1000 * 60 * 2)) {
                        timeColor = '#FFD600'
                    }

                    const lastDepature = lastRow && lastRow.type === 'stop' ? DateTime.fromISO(lastRow.stop.departure) : null
                    const thisArrival = DateTime.fromISO(currentRow.stop.arrival)
                    const thisDepature = DateTime.fromISO(currentRow.stop.departure)
                    const nextArrival = nextRow && nextRow.type === 'stop' ? DateTime.fromISO(nextRow.stop.arrival) : null

                    if(DateTime.now() >= thisArrival && DateTime.now() <= thisDepature) {
                        blueDot = 50
                    } else if(lastDepature && lastDepature < DateTime.now() && DateTime.now() < thisArrival) {
                        const max = lastDepature.diff(thisArrival).toMillis()
                        const process = lastDepature.diffNow().toMillis()
                        const percentage = (process / max) - 0.5
                        if(percentage > 0) {
                            blueDot = percentage * 100
                        }
                    } else if(nextArrival && nextArrival > DateTime.now() && thisDepature < DateTime.now()) {
                        const max = thisDepature.diff(nextArrival).toMillis()
                        const process = thisDepature.diffNow().toMillis()
                        const percentage = (process / max) + 0.5
                        if(percentage < 1) {
                            blueDot = percentage * 100
                        }
                    }

                    return (
                        <TimetableRow key={index} node={{bottom, dot, top, blueDot}} time={timeString} timeColor={timeColor}>
                            <StopLabel cancelled={currentRow.stop.cancelled} stopPassed={stopPassed}>{currentRow.stop.station}</StopLabel>
                        </TimetableRow>
                    )
                } else if(currentRow.type === 'tripChange') {
                    dot.size = '2rem'

                    return (
                        <TimetableRow key={index} node={{bottom, dot, top, blueDot}}>
                            <TripChangeContainer color={colorToUse}>
                                <TripChangeTop>{index !== 0 ? 'Weiter als' : null}</TripChangeTop>
                                <TripChangeBottom href={currentRow.marudor} target='_blank' color={colorToUse}>{currentRow.to}</TripChangeBottom>
                            </TripChangeContainer>
                        </TimetableRow>
                    )
                }

                return null
            })}
        </TimetableContainer>
    )
}

export function MultiTimetable({trainTrips, cutoffIndex}: {trainTrips: TrainTrip[], cutoffIndex: number}) {
    let rowData = []

    for(let i = cutoffIndex; i >= 0; i--) {
        const trainTrip = trainTrips[i]
        const stops = trainTrip.stops ?? []
        
        if(stops.length === 0) continue

        rowData = [
            ...rowData,
            {type: 'tripChange', to: `${trainTrip.train_type} ${trainTrip.train_number} -> ${trainTrip.destination_station}`, time: trainTrip.stops[0].departure || trainTrip.stops[0].arrival, marudor: trainTrip.marudor},
            ...stops.map(stop => ({ type: 'stop', stop, index: stops.indexOf(stop), time: stop.departure || stop.arrival })),
        ]
    }
    
    return <TimetableRenderer rows={rowData} />
}

export function FullTimetable({trainTrip}: {trainTrip: TrainTrip}) {
    const stops = trainTrip.stops ?? []
    const rowData = stops.map(stop => ({ type: 'stop', stop, index: stops.indexOf(stop), time: stop.departure || stop.arrival }))

    return <TimetableRenderer rows={rowData} />
}

export function ShortTimetable({trainTrip}: {trainTrip: TrainTrip}) {
    const allStops = trainTrip.stops ?? []
    const selectedStops = new Set<TrainStop>()

    selectedStops.add(allStops[0])
    for(let i = 0; i < allStops.length; i++) {
        const stop = allStops[i]

        if(DateTime.fromISO(stop.arrival || stop.departure) > DateTime.now()) {
            if(allStops[i - 1]) {
                if(i === allStops.length - 1) {
                    selectedStops.add(allStops[i - 2])
                }

                selectedStops.add(allStops[i - 1])
            }

            selectedStops.add(stop)

            break
        }
    }

    if(selectedStops.size < 3) {
        const middleNode = allStops[Math.floor(allStops.length / 2)]
        const departure = DateTime.fromISO(middleNode.departure)

        if(departure > DateTime.now()) {
            selectedStops.add(allStops[1])
            selectedStops.add(allStops[2])
        } else {
            selectedStops.add(allStops[allStops.length - 3])
            selectedStops.add(allStops[allStops.length - 2])
        }
    }

    selectedStops.add(allStops[allStops.length - 1])

    const rowData = Array.from(selectedStops).map(stop => ({ type: 'stop', stop, index: allStops.indexOf(stop), time: stop.departure || stop.arrival }))
    return <TimetableRenderer rows={rowData} />
}
