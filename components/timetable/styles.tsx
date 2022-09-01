import styled, { css } from 'styled-components'

/* eslint-disable @typescript-eslint/no-explicit-any  */
function shouldForwardProp(prop: string | number) {
    return (['children', 'href', 'target', 'onClick'] as (string | number)[]).includes(prop)
}


export const NodeContainer: any = styled.div.withConfig({ shouldForwardProp })`
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

export const Dot: any = styled.div.withConfig({ shouldForwardProp })`
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

export const ConnectingLine: any = styled.div.withConfig({ shouldForwardProp })`
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

export const TopConnectingLine: any = styled(ConnectingLine)`
    top: 0;

    ${(props: any) => props.type === 'dotted' && css`
        top: ${props.width};

        @supports (-moz-appearance:none) {
            top: calc(${props.width} * -1);
        }
    `}

    height: 50%;
`

export const BottomConnectingLine = styled(ConnectingLine)`
    top: 50%;
    height: 50%;
`

export const TimetableRowContainer = styled.div`
    position: relative;
    width: 100%;

    display: flex;
    align-items: center;
`

export const TimeWrapper: any = styled.div.withConfig({ shouldForwardProp })`
    width: calc(5.5em + 15px);
    flex-shrink: 0;
    margin: 5px 0;
    min-height: 2rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const TimeDisplay: any = styled.span.withConfig({ shouldForwardProp })`
    display: flex;
    align-items: center;
    justify-content: left;

    font-size: 1rem;
    font-weight: bold;

    ${(props: any) => css`
        color: ${props.color};
    `}

    ${(props: any) => props.cancelled && css`
        text-decoration: line-through;
    `}
`

export const BlueDot = styled.div`
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

export const StopLabel: any = styled.b.withConfig({ shouldForwardProp })`
    word-break: break-word;
    
    ${(props: any) => css`
        text-decoration: ${props.cancelled ? 'line-through' : ''};
        color: ${props.stopPassed ? 'var(--text-dark-color)' : 'var(--text-color)'}
    `}
`

export const TimetableContainer = styled.span`

`

export const TripChangeContainer: any = styled.div.withConfig({ shouldForwardProp })`
    display: flex;
    flex-direction: column;
    ${(props: any) => css`
        color: ${props.color}
    `}
`

export const TripChangeTop = styled.span`
    font-size: 0.8rem;
    font-weight: bold;
`

export const TripChangeBottom: any = styled.a.withConfig({ shouldForwardProp })`
    font-weight: bold;

    ${(props: any) => css`
        color: ${props.color};

        :visited {
            color: ${props.color};
        }
    `}
`
