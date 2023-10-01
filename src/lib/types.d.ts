type Optional<t> = t | undefined

type VereinEvent = {
    name: string,
    description: string,
}

type User = {
    username: string,
    password: string,
    group: AccessGroup,
}

type Verein = {
    name: string,
    description: string,
    website?: string,
    email?: string,
    displayOrder?: number,
}

type AccessToken = {
    group: AccessGroup,
    vereinID: null | string,
}

type AccessGroup =
    'USER' |    // default value for unauthorized users
    'ADMIN' |   // for vereins administrators
    'ROOT'      // for website administrators (students only)

type OstEvent = {
    name: string,
    date: Date,
    description: string,
    mainImage?: string
    startTime?: string,
    endTime?: string,
    entranceFee?: number,
    contactEmail?: string,
    contactPhone?: string,
    organiser?: string,
    organiserId?: string,
    linkName?: string,
    link?: string,
}
