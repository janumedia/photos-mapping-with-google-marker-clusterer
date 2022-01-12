<template>
    <div class="map" ref="root"></div>
</template>
<reference types="@types/googlemaps" />
<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {MarkerClusterer, GridAlgorithm} from '@googlemaps/markerclusterer'
import { locationType } from '../types/locationType';
import { CreateIcon } from '../utils/CreateIcon';
import { ClusterRenderer } from '../classes/ClusterRenderer';
import { MapMarker } from '../classes/MapMarker';

const root = ref(null);
const google = window.google;

onMounted (() => {
    const map = new google.maps.Map(root.value, {
        zoom: 10,
        minZoom: 2,
        maxZoom: 19,
        center: new google.maps.LatLng(-8.447168, 115.1083)
    });
    fetch('locations.json').then(res => res.json()).then(data => {
        let locs: locationType[] = (data.events as locationType[]).filter(loc => loc.gps).map(loc => {
            return {
                gps: loc.gps,
                media: loc.media ? loc.media : {
                    url: "images/contents/PLDronkers_foto.jpg",
                    caption: "Drs. Pieter Leendert Dronkers tahun 1980",
                    credit: "D.J.Dronkers"
                },
                text: loc.text
            }
        })
        
        let markers = locs.map((loc, i) => {
            let {lat, lng, zoom} = loc.gps;
            let marker = new MapMarker({
                map: map,
                position: {lat: lat, lng: lng}
            })
            marker.zoom = zoom;
            marker.media = loc.media;
            marker.setIcon(CreateIcon(marker));
            return marker;
        });
    
        let renderer = new ClusterRenderer();
        let algorithm = new GridAlgorithm({gridSize:60, maxZoom: 30})
        let markerCluster = new MarkerClusterer({map, markers, renderer, algorithm});
    })
})

</script>
<style>
.map {
    width: 100vw;
    height: 100vh;
    background-color:grey;
}
.markerLabel {
    background-color: black;
    padding: 0.4em;
    min-width: 1.2em;
    max-width: max-content;
    height: 1.2em;
    border-radius: 1.2em;
}
</style>
