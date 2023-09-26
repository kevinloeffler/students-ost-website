export function formatDateToString(rawDate: string | Date, omitYear: boolean = false): string {
    const date = new Date(rawDate)

    if (omitYear) return `${date.getDate()}.${date.getMonth() + 1}`

    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
}
