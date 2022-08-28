import { TrainStop } from '../../util/commonTypes'
import { DateTime } from 'luxon'
import type { ReactNode } from 'react'
import { StopLabel, TimeDisplay, TimetableRowContainer, TripChangeBottom, TripChangeContainer, TripChangeTop } from './styles'
import { Node, NodeArgs } from './Node'

export type RowRendererArgs = {stop?: TrainStop, index: number, type: string, time: string, to?: string | null, marudor?: string}

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

        const time = DateTime.fromISO(currentRow.time)
        const plannedTime = DateTime.fromISO(currentRow.stop.scheduled_departure || currentRow.stop.scheduled_arrival!)

        const stopPassed = time < DateTime.now()

        const timeString = time.toFormat('HH:mm')
        let timeColor = colorToUse

        if(!stopPassed && time > plannedTime.plus(1000 * 60 * 2)) {
            timeColor = '#FFD600'
        }

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
            <TimetableRow key={currentRow.index} node={{bottom, dot, top, blueDot}} time={{time: timeString, color: timeColor, cancelled: currentRow.stop.cancelled}}>
                <StopLabel cancelled={currentRow.stop.cancelled} stopPassed={stopPassed}>{currentRow.stop.station}</StopLabel>
            </TimetableRow>
        )
    } else if(currentRow.type === 'tripChange') {
        dot.size = '2rem'

        return (
            <TimetableRow key={currentRow.index} node={{bottom, dot, top, blueDot}}>
                <TripChangeContainer color={colorToUse}>
                    <TripChangeTop>{currentRow.index !== 0 ? 'Weiter als' : null}</TripChangeTop>
                    <TripChangeBottom href={currentRow.marudor} target='_blank' color={colorToUse}>{currentRow.to}</TripChangeBottom>
                </TripChangeContainer>
            </TimetableRow>
        )
    }
    
    return null
}

function TimetableRow({children, time, node}: {children?: ReactNode, time?: {time: string, color: string, cancelled?: boolean}, node: NodeArgs}) {
    return (
        <TimetableRowContainer>
            {time ? (
                <TimeDisplay color={time.color} cancelled={time.cancelled}>{time.time}</TimeDisplay>
            ): (
                <TimeDisplay>{'\xa0'}</TimeDisplay>
            )}

            <Node offset={'3.75em'} {...node} />
            
            {children}
        </TimetableRowContainer>
    )
}
