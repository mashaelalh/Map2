/**
 * DOWNTOWN RIYADH — Map Controller
 * Handles map initialization, markers, and camera movements
 */

const MapController = {
    /**
     * Initialize the map
     */
    init() {
        STATE.map = new maplibregl.Map({
            container: 'map',
            style: CONFIG.styles[STATE.currentTheme],
            center: CONFIG.map.center,
            zoom: CONFIG.map.zoom,
            pitch: CONFIG.map.pitch,
            bearing: CONFIG.map.bearing,
            minZoom: CONFIG.map.minZoom,
            maxZoom: CONFIG.map.maxZoom,
            antialias: true,
            attributionControl: false
        });

        // Add navigation controls
        STATE.map.addControl(new maplibregl.NavigationControl({
            showCompass: true,
            showZoom: true,
            visualizePitch: true
        }), 'top-left');

        // Add scale control
        STATE.map.addControl(new maplibregl.ScaleControl({
            maxWidth: 100,
            unit: 'metric'
        }), 'bottom-right');

        // Wait for map to load
        STATE.map.on('load', () => {
            this.onMapLoad();
        });

        // Update coordinates on move
        STATE.map.on('move', () => {
            this.updateCoordinates();
        });

        return STATE.map;
    },

    /**
     * Called when map finishes loading
     */
    onMapLoad() {
        console.log('Map loaded successfully');

        // Add 3D buildings layer
        this.add3DBuildings();

        // Trigger ready event
        if (window.onMapReady) {
            window.onMapReady();
        }
    },

    /**
     * Add 3D buildings layer for depth
     */
    add3DBuildings() {
        // Note: 3D buildings require vector tiles
        // With raster tiles, we skip this
        // If upgrading to vector tiles (Mapbox/Maptiler), uncomment:
        /*
        STATE.map.addLayer({
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 14,
            'paint': {
                'fill-extrusion-color': '#1a1f28',
                'fill-extrusion-height': ['get', 'height'],
                'fill-extrusion-base': ['get', 'min_height'],
                'fill-extrusion-opacity': 0.8
            }
        });
        */
    },

    /**
     * Add markers to the map
     */
    addMarkers(landmarks) {
        // Clear existing markers
        this.clearMarkers();

        landmarks.forEach(landmark => {
            // Create marker element
            const el = document.createElement('div');
            el.className = `marker ${landmark.importance}`;
            el.setAttribute('data-id', landmark.id);
            el.innerHTML = CONFIG.categories[landmark.category]?.emoji || '📍';

            // Create popup with landmark info
            const popup = new maplibregl.Popup({
                offset: 25,
                closeButton: false,
                className: 'landmark-popup'
            }).setHTML(`
                <div style="padding: 8px;">
                    <strong style="color: var(--color-text-primary); font-size: 14px;">
                        ${landmark.shortName}
                    </strong>
                    <div style="color: var(--color-text-tertiary); font-size: 11px; margin-top: 4px;">
                        ${landmark.category.toUpperCase()}
                    </div>
                </div>
            `);

            // Create and add marker
            const marker = new maplibregl.Marker({
                element: el,
                anchor: 'center'
            })
                .setLngLat(landmark.coordinates)
                .setPopup(popup)
                .addTo(STATE.map);

            // Add click handler
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                this.onMarkerClick(landmark);
            });

            // Store marker reference
            STATE.markers.push({
                marker,
                landmark,
                element: el
            });
        });
    },

    /**
     * Clear all markers
     */
    clearMarkers() {
        STATE.markers.forEach(({ marker }) => {
            marker.remove();
        });
        STATE.markers = [];
    },

    /**
     * Filter markers by active layers
     */
    filterMarkers() {
        STATE.markers.forEach(({ element, landmark }) => {
            const shouldShow = STATE.activeLayers.has(landmark.category);
            element.style.display = shouldShow ? 'flex' : 'none';
        });
    },

    /**
     * Handle marker click
     */
    onMarkerClick(landmark) {
        // Fly to landmark
        this.flyTo({
            center: landmark.coordinates,
            zoom: 15,
            pitch: 60
        });

        // Show info panel
        if (window.UIController) {
            window.UIController.showLandmarkInfo(landmark);
        }
    },

    /**
     * Fly to a location with smooth animation
     */
    flyTo(options) {
        const defaults = {
            duration: CONFIG.animation.duration,
            essential: true,
            easing: (t) => {
                // Custom easing function for smooth deceleration
                return t < 0.5
                    ? 4 * t * t * t
                    : 1 - Math.pow(-2 * t + 2, 3) / 2;
            }
        };

        STATE.map.flyTo({ ...defaults, ...options });
    },

    /**
     * Reset to default view
     */
    resetView() {
        this.flyTo({
            center: CONFIG.map.center,
            zoom: CONFIG.map.zoom,
            pitch: CONFIG.map.pitch,
            bearing: CONFIG.map.bearing
        });
    },

    /**
     * Toggle between day/night themes
     */
    toggleTheme() {
        STATE.currentTheme = STATE.currentTheme === 'dark' ? 'light' : 'dark';

        // Update map style
        STATE.map.setStyle(CONFIG.styles[STATE.currentTheme]);

        // Re-add markers after style loads
        STATE.map.once('styledata', () => {
            if (STATE.data) {
                this.addMarkers(STATE.data.landmarks);
                this.filterMarkers();
            }
        });

        // Update body class
        document.body.classList.toggle('light-theme', STATE.currentTheme === 'light');

        return STATE.currentTheme;
    },

    /**
     * Update footer coordinates display
     */
    updateCoordinates() {
        const center = STATE.map.getCenter();
        const coordsEl = document.getElementById('footerCoords');

        if (coordsEl) {
            coordsEl.textContent = `${center.lat.toFixed(4)}°N, ${center.lng.toFixed(4)}°E`;
        }
    },

    /**
     * Get visible landmarks in current view
     */
    getVisibleLandmarks() {
        const bounds = STATE.map.getBounds();

        return STATE.markers
            .filter(({ landmark }) => {
                const [lng, lat] = landmark.coordinates;
                return bounds.contains([lng, lat]) &&
                       STATE.activeLayers.has(landmark.category);
            })
            .map(({ landmark }) => landmark);
    },

    /**
     * Highlight a specific marker
     */
    highlightMarker(landmarkId) {
        STATE.markers.forEach(({ element, landmark }) => {
            if (landmark.id === landmarkId) {
                element.classList.add('active');
                element.style.transform = 'scale(1.2)';
            } else {
                element.classList.remove('active');
                element.style.transform = '';
            }
        });
    },

    /**
     * Clear all marker highlights
     */
    clearHighlights() {
        STATE.markers.forEach(({ element }) => {
            element.classList.remove('active');
            element.style.transform = '';
        });
    }
};
