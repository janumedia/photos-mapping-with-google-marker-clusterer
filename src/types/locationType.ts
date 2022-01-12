import { gpsType } from './gpsType'
import { mediaType } from './mediaType'

export type locationType = {
    category?: string[],
    gps: gpsType,
    media?: mediaType,
    text?: textType
}

export type textType = {
    headline: string,
    text: string
}