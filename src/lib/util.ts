export function formatDateToString(rawDate: string | Date, omitYear: boolean = false, shortYear: boolean = false): string {
    const date = new Date(rawDate)

    if (omitYear) return `${date.getDate()}.${date.getMonth() + 1}`

    if (shortYear) return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear().toString().slice(2, 4)}`

    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
}
