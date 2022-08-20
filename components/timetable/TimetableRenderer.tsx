import { TimetableContainer } from './styles'
import SingleRowRenderer, { RowRendererArgs } from './SingleRowRenderer'

export default function TimetableRenderer({rows}: {rows: RowRendererArgs[]}) {
    return (
        <TimetableContainer>
            {rows.map((currentRow, index) => {
                const nextRow = rows[index + 1]
                const lastRow = rows[index - 1]

                return <SingleRowRenderer key={index} currentRow={currentRow} nextRow={nextRow} lastRow={lastRow} />
            })}
        </TimetableContainer>
    )
}
