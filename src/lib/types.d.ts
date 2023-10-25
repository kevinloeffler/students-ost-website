type Optional<t> = t | undefined

type User = {
    username: string,
    password: string,
    group: AccessGroup,
    organisation?: string,
}

type OrganisationType =
    'Verein' |
    'Fachschaft'

type Organisation = {
    name: string,
    type: OrganisationType,
    description: string,
    _id?: string,
    logo?: string,
    website?: string,
    email?: string,
    displayOrder?: number,
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
    username: string,
}

type AccessGroup =
    'USER' |    // default value for unauthorized users
    'ADMIN' |   // for vereins administrators
    'ROOT'      // for website administrators (students only)

type OstEvent = {
    name: string,
    date: Date,
    description: string,
    _id?: string,
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

type FileObject = {
    data?: Uint8Array | {[key: string]: number},
    fileId?: string,
    suffix?: string,
}
