<script setup>
import { onMounted } from 'vue';
import axios from 'axios';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

let map;

onMounted(async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/';
    return;
  }
  try {
    const res = await axios.get('http://localhost:3000/faults', {
      headers: { Authorization: `Bearer ${token}` }
    });
    initMap(res.data);
  } catch (err) {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
});

function initMap(faults) {
  map = L.map('map').setView([4.60971, -74.08175], 8);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
  }).addTo(map);
  faults.forEach(f => {
    L.marker([f.lat, f.lng]).addTo(map)
      .bindPopup(`<b>${f.name}</b><br>Riesgo: ${f.risk}`);
  });
}
</script>

<template>
  <div id="map" style="height: 500px;"></div>
</template>

<style>
#map { height: 500px; }
</style>
