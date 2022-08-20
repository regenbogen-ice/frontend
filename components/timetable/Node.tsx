import { BlueDot, BottomConnectingLine, Dot, NodeContainer, TopConnectingLine } from './styles'

type ConnectingLineArgs = {width: string, color?: string, type: string}
type DotArgs = {size: string, color: string}
export type NodeArgs = {top?: ConnectingLineArgs, dot: DotArgs, bottom?: ConnectingLineArgs, offset?: string, blueDot?: number}

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
