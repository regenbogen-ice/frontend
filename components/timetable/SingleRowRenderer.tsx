import { TrainStop } from '../../util/commonTypes'
import { DateTime } from 'luxon'
import type { ReactNode } from 'react'
import { StopLabel, TimeDisplay, TimetableRowContainer, TimeWrapper, TripChangeBottom, TripChangeContainer, TripChangeTop } from './styles'
import { Node, NodeArgs } from './Node'
import Link from 'next/link'

export type RowRendererArgs = {stop?: TrainStop, index: number, type: string, time: string, to?: string | null, link?: string}

type Time = {time: string, color: string, cancelled?: boolean}

export default function SingleRowRenderer({currentRow, nextRow, lastRow}: {currentRow: RowRendererArgs, nextRow: RowRendererArgs, lastRow: RowRendererArgs}) {
    let bottom = null
    // eslint-disable-next-line prefer-const
    let dot = {size: '1rem', color: 'var(--text-color)'}
    let top = null
    let blueDot: number | null = null

    if(nextRow) {
        const color = DateTime.fromISO(nextRow?.stop?.arrival || nextRow.time) < DateTime.now() ? 'var(--text-dark-color)' : 'var(--text-color)'
        bottom = {type: 'solid', width: '.2rem', color}
    }

    const colorToUse = DateTime.fromISO(currentRow?.stop?.arrival || currentRow.time) < DateTime.now() ? 'var(--text-dark-color)' : 'var(--text-color)'
    dot.color = colorToUse

    if(lastRow) {
        top = {type: 'solid', width: '.2rem', color: colorToUse}
    }

    if(currentRow.type === 'stop' && currentRow.stop) {

        if(nextRow?.type === 'stop') {
            if(bottom !== null && nextRow.index !== currentRow.index + 1) {
                bottom.type = 'dotted'
            }
        } else {
            dot.size = '1.5rem'
        }

        if(lastRow?.type === 'stop') {
            if(top !== null && lastRow.index !== currentRow.index - 1) {
                top.type = 'dotted'
            }
        } else {
            dot.size = '1.5rem'
        }

        const stopTime = currentRow.stop.departure || currentRow.stop.arrival
        const stopPassed = DateTime.fromISO(stopTime!) < DateTime.now()

        const times: Time[] = [[currentRow.stop.arrival, currentRow.stop.scheduled_arrival], [currentRow.stop.departure, currentRow.stop.scheduled_departure]]
            .filter(([time, scheduledTime]) => time && scheduledTime)
            .map(([time, scheduledTime]) => {
                const timeObj = DateTime.fromISO(time!)
                const formattedTime = timeObj.toFormat('HH:mm')
                const delayed = DateTime.fromISO(scheduledTime!).plus({ minutes: 3 }) < timeObj

                const normalColor = delayed ? '#FFD600' : 'var(--text-color)'
                
                return {
                    time: formattedTime,
                    color: stopPassed ? 'var(--text-dark-color)' : normalColor,
                    cancelled: currentRow.stop?.cancelled,
                }
            })

        const lastDepature = lastRow?.type === 'stop' && lastRow.stop ? DateTime.fromISO(lastRow.stop.departure!) : null
        const thisArrival = DateTime.fromISO(currentRow.stop.arrival!)
        const thisDepature = DateTime.fromISO(currentRow.stop.departure!)
        const nextArrival = nextRow?.type === 'stop' && nextRow.stop ? DateTime.fromISO(nextRow.stop.arrival!) : null

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
            <TimetableRow key={currentRow.index} node={{bottom, dot, top, blueDot}} times={times}>
                <StopLabel cancelled={currentRow.stop.cancelled} stopPassed={stopPassed}>{currentRow.stop.station}</StopLabel>
            </TimetableRow>
        )
    } else if(currentRow.type === 'tripChange') {
        dot.size = '2rem'

        return (
            <TimetableRow key={currentRow.index} node={{bottom, dot, top, blueDot}}>
                <TripChangeContainer color={colorToUse}>
                    <TripChangeTop>{currentRow.index !== 0 ? 'Weiter als' : null}</TripChangeTop>
                    {currentRow.link ? (
                        <Link href={currentRow.link} passHref>
                            <TripChangeBottom target='_blank' color={colorToUse}>{currentRow.to}</TripChangeBottom>
                        </Link>
                    ) : (
                        <TripChangeBottom color={colorToUse}>{currentRow.to}</TripChangeBottom>
                    )}
                </TripChangeContainer>
            </TimetableRow>
        )
    }
    
    return null
}

function TimetableRow({children, times, node}: {children?: ReactNode, times?: Time[], node: NodeArgs}) {
    return (
        <TimetableRowContainer>
            <TimeWrapper>
                {times && times.map((time, index) => {
                    return <TimeDisplay key={index} color={time.color} cancelled={time.cancelled}>{time.time}</TimeDisplay>
                })}
            </TimeWrapper>

            <Node offset={'3.75em'} {...node} />
            
            {children}
        </TimetableRowContainer>
    )
}
