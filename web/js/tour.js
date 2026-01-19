/**
 * DOWNTOWN RIYADH — Tour Controller
 * Manages guided tour functionality with auto-fly camera
 */

const TourController = {
    autoPlayTimer: null,
    isTransitioning: false,

    /**
     * Initialize tour with landmarks data
     */
    init(landmarks) {
        // Create tour stops from critical and high importance landmarks
        STATE.tourStops = landmarks
            .filter(l => l.importance === 'critical' || l.importance === 'high')
            .sort((a, b) => {
                // Sort by importance and then by category
                const importanceOrder = { critical: 0, high: 1, medium: 2 };
                return importanceOrder[a.importance] - importanceOrder[b.importance];
            });

        // Initialize tour controls
        this.initControls();
    },

    /**
     * Initialize tour control buttons
     */
    initControls() {
        const prevButton = document.getElementById('tourPrev');
        const nextButton = document.getElementById('tourNext');

        if (prevButton) {
            prevButton.addEventListener('click', () => this.prev());
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => this.next());
        }
    },

    /**
     * Start the guided tour
     */
    start() {
        if (STATE.tourStops.length === 0) {
            console.warn('No tour stops available');
            return;
        }

        STATE.tourActive = true;
        STATE.tourIndex = 0;

        // Update UI
        UIController.updateTourButton(true);
        UIController.showTourControls();

        // Go to first stop
        this.goToStop(0);

        // Start auto-play after first stop
        this.scheduleNextStop();
    },

    /**
     * Stop the tour
     */
    stop() {
        STATE.tourActive = false;
        this.clearAutoPlay();

        // Update UI
        UIController.updateTourButton(false);
        UIController.hideTourControls();
        UIController.hideInfoPanel();
        MapController.clearHighlights();
    },

    /**
     * Go to next tour stop
     */
    next() {
        if (!STATE.tourActive) return;

        this.clearAutoPlay();

        const nextIndex = (STATE.tourIndex + 1) % STATE.tourStops.length;
        this.goToStop(nextIndex);

        this.scheduleNextStop();
    },

    /**
     * Go to previous tour stop
     */
    prev() {
        if (!STATE.tourActive) return;

        this.clearAutoPlay();

        const prevIndex = STATE.tourIndex === 0
            ? STATE.tourStops.length - 1
            : STATE.tourIndex - 1;

        this.goToStop(prevIndex);

        this.scheduleNextStop();
    },

    /**
     * Navigate to a specific tour stop
     */
    goToStop(index) {
        if (this.isTransitioning) return;

        STATE.tourIndex = index;
        const landmark = STATE.tourStops[index];

        if (!landmark) {
            console.warn('Invalid tour stop index:', index);
            return;
        }

        this.isTransitioning = true;

        // Determine camera settings based on landmark type
        const zoomLevel = landmark.importance === 'critical' ? 15.5 : 15;
        const pitch = landmark.category === 'landmark' ? 65 : 55;

        // Fly to landmark
        MapController.flyTo({
            center: landmark.coordinates,
            zoom: zoomLevel,
            pitch: pitch,
            bearing: this.calculateBearing(index),
            duration: CONFIG.animation.tourDuration
        });

        // Show landmark info
        UIController.showLandmarkInfo(landmark);

        // Update counter
        this.updateCounter();

        // Update button states
        this.updateButtonStates();

        // Reset transition flag after animation
        setTimeout(() => {
            this.isTransitioning = false;
        }, CONFIG.animation.tourDuration);
    },

    /**
     * Calculate bearing for varied camera angles
     */
    calculateBearing(index) {
        // Rotate camera for visual variety
        const bearings = [0, 45, 90, 135, 180, 225, 270, 315];
        return bearings[index % bearings.length];
    },

    /**
     * Schedule automatic transition to next stop
     */
    scheduleNextStop() {
        if (!STATE.tourActive) return;

        this.clearAutoPlay();

        // Auto-advance after tour duration + pause
        const delay = CONFIG.animation.tourDuration + CONFIG.animation.tourPause + 3000;

        this.autoPlayTimer = setTimeout(() => {
            if (STATE.tourActive) {
                this.next();
            }
        }, delay);
    },

    /**
     * Clear auto-play timer
     */
    clearAutoPlay() {
        if (this.autoPlayTimer) {
            clearTimeout(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    },

    /**
     * Update tour counter display
     */
    updateCounter() {
        const counterEl = document.getElementById('tourCounter');
        if (counterEl) {
            counterEl.textContent = `${STATE.tourIndex + 1} / ${STATE.tourStops.length}`;
        }
    },

    /**
     * Update prev/next button states
     */
    updateButtonStates() {
        const prevButton = document.getElementById('tourPrev');
        const nextButton = document.getElementById('tourNext');

        if (prevButton && nextButton) {
            // Always enable both buttons (tour loops)
            prevButton.disabled = false;
            nextButton.disabled = false;
        }
    },

    /**
     * Jump to specific landmark in tour
     */
    jumpTo(landmarkId) {
        const index = STATE.tourStops.findIndex(l => l.id === landmarkId);

        if (index !== -1) {
            this.clearAutoPlay();
            this.goToStop(index);
            this.scheduleNextStop();
        }
    }
};

// Make TourController globally accessible
window.TourController = TourController;
