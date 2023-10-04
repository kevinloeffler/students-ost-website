export function formatDateToString(rawDate: string | Date, omitYear: boolean = false, shortYear: boolean = false, addPadding: boolean = false): string {
    const date = new Date(rawDate)
    let dateStrings: string[]

    if (omitYear) {
        dateStrings = [date.getDate().toString(), (date.getMonth() + 1).toString()]
    } else if (shortYear) {
        dateStrings = [date.getDate().toString(), (date.getMonth() + 1).toString(), date.getFullYear().toString().slice(2, 4)]
    } else {
        dateStrings = [date.getDate().toString(), (date.getMonth() + 1).toString(), date.getFullYear().toString()]
    }

    return concatDateString(dateStrings, addPadding)
}

function concatDateString(dateStrings: string[], addPadding: boolean): string {
    let formattedString = ''

    for (let dateString of dateStrings) {
        formattedString += addPadding ? dateString.padStart(2, '0') : dateString
        formattedString += '.'
    }

    return formattedString.slice(0, formattedString.length - 1)
}

// TODO: add tests
