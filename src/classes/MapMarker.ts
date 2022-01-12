import { mediaType } from '../types/mediaType';
const google = window.google;

export class MapMarker extends google.maps.Marker {
    _zoom: number = 1;
    _media: mediaType;

    get zoom() : number {
        return this._zoom;
    }
    set zoom(z:number) {
        this._zoom = z;
    }
    get media() : mediaType {
        return this._media;
    }
    set media(m:mediaType) {
        this._media = m;
    }
}