export default function UicID({uic}: {uic: string}) {
    const formatted = formatUIC(uic)

    return (
        <>{formatted.substring(0,7)}<b>{formatted.substring(7)}</b></>
    )
}

export function formatUIC(rawUIC: string) {
    return `${rawUIC.substring(0,2)} ${rawUIC.substring(2,4)} ${rawUIC.substring(4,8)} ${rawUIC.substring(8,11)}-${rawUIC.substring(11,12)}`
}
