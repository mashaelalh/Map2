/**
 * DOWNTOWN RIYADH — Configuration
 * Central configuration and constants
 */

const CONFIG = {
    // Map Styles
    styles: {
        dark: {
            version: 8,
            name: 'Downtown Riyadh Dark',
            sources: {
                'osm': {
                    type: 'raster',
                    tiles: [
                        'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
                        'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
                        'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png'
                    ],
                    tileSize: 256,
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                }
            },
            layers: [
                {
                    id: 'osm-tiles',
                    type: 'raster',
                    source: 'osm',
                    minzoom: 0,
                    maxzoom: 22
                }
            ],
            glyphs: 'https://fonts.openmaptiles.org/{fontstack}/{range}.pbf'
        },
        light: {
            version: 8,
            name: 'Downtown Riyadh Light',
            sources: {
                'osm': {
                    type: 'raster',
                    tiles: [
                        'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png',
                        'https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png',
                        'https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png'
                    ],
                    tileSize: 256,
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                }
            },
            layers: [
                {
                    id: 'osm-tiles',
                    type: 'raster',
                    source: 'osm',
                    minzoom: 0,
                    maxzoom: 22
                }
            ],
            glyphs: 'https://fonts.openmaptiles.org/{fontstack}/{range}.pbf'
        }
    },

    // Default map settings
    map: {
        center: [46.6753, 24.7136], // Downtown Riyadh
        zoom: 12.5,
        pitch: 45,
        bearing: 0,
        minZoom: 10,
        maxZoom: 18
    },

    // Animation settings
    animation: {
        duration: 2000,
        easing: 'easeInOutCubic',
        tourDuration: 3500,
        tourPause: 500
    },

    // Category colors and icons
    categories: {
        landmark: {
            color: '#d4af37',
            emoji: '🏛️'
        },
        business: {
            color: '#4a9eff',
            emoji: '🏢'
        },
        culture: {
            color: '#8b5cf6',
            emoji: '🎭'
        }
    },

    // Data source
    dataPath: 'data/landmarks.json'
};

// Global state
const STATE = {
    map: null,
    data: null,
    markers: [],
    activeLayers: new Set(['landmarks', 'business', 'culture']),
    currentTheme: 'dark',
    tourActive: false,
    tourIndex: 0,
    tourStops: []
};
