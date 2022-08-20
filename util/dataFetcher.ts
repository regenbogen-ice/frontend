const API_BASE = process.env.NEXT_PUBLIC_API_BASE

const fetchFromAPI = async (arg: any, method: string): Promise<any> => {
    let response: Response | null = null

    if(!arg) throw new Error('missing arg')

    switch(method) {
        case 'trainTripCurrent':
            response = await fetch(API_BASE + 'v1/train_vehicle?q=' + encodeURIComponent(arg[0]) + '&trip_limit=5&include_routes=true&include_marudor_link=true&train_type=' + encodeURIComponent(arg[1]))
            break

        case 'trainTripHistory':
            response = await fetch(API_BASE + 'v1/train_vehicle?q=' + encodeURIComponent(arg[0]) + '&trip_limit=500&include_routes=false&train_type=' + encodeURIComponent(arg[1]))
            break

        case 'autocomplete':
            response = await fetch(API_BASE + 'v2/autocomplete/' + encodeURIComponent(arg))
            break

        default:
            throw new Error('invalid method')
    }

    if(!response.ok) throw new Error('HTTP ' + response.status)

    const json = await response.json()
    return json
}

export default fetchFromAPI
