import { Cluster, ClusterStats, DefaultRenderer, Renderer } from "@googlemaps/markerclusterer";
import { MapMarker } from "./MapMarker";
import { CreateIcon } from "../utils/CreateIcon";

const google = window.google;

export class ClusterRenderer extends DefaultRenderer implements Renderer {
    render(cluster:Cluster, stats: ClusterStats) : google.maps.Marker {
        const marker =  new MapMarker({
            position: cluster.position,
            label: {
                className: "markerLabel",
                color: '#FFF',
                text: String(cluster.count)
            }
        });
        const {zoom, media} = (cluster.markers as MapMarker[])[0];
        marker.zoom = zoom;
        marker.media = media;
        marker.setIcon(CreateIcon(marker));
        return marker;
    }
}