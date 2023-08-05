<template>
  <div v-if="mapIsReady" style="height: 600px; width: 70%">
    <p class="text-secondary fw-bold fs-3">Location:</p>
    <LMap style="height:100%;width:100%"
      :useGlobalLeaflet="false"
      :center="mapData.center"
      :zoom="mapData.zoom"
    >
      <l-tile-layer
        :url="mapData.url"
        :attribution="mapData.attribution"
      ></l-tile-layer>
      <l-marker :lat-lng="mapData.markerLatLng"></l-marker>
    </LMap>
  </div>
</template>
  
  <script setup>
// DON'T load Leaflet components here!
// Its CSS is needed though, if not imported elsewhere in your application.
import "leaflet/dist/leaflet.css";
import { LMap, LGeoJson, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
const props = defineProps(['lon','lat']);
const mapIsReady = ref(false);
const mapData = ref({
  zoom: 8,
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution:
    '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  center: [22.2332, 44.2344],
  markerLatLng: [22.2332, 44.2344],
});

onBeforeMount(async () => {
  if (!props.lon || !props.lat) {
    mapIsReady.value = false;
  } else {
    mapData.value.center=[props.lon,props.lat]
    mapData.value.markerLatLng=[props.lon,props.lat]
    // HERE is where to load Leaflet components!
    const { circleMarker } = await import("leaflet/dist/leaflet-src.esm");

    // // And now the Leaflet circleMarker function can be used by the options:
    // geojsonOptions.pointToLayer = (feature, latLng) =>
    //   circleMarker(latLng, { radius: 8 });
    mapIsReady.value = true;
  }
});
</script>