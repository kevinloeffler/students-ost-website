export function formatDateToString(rawDate: string | Date): string {
    const date = new Date(rawDate)
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
}
