/**
 * DOWNTOWN RIYADH — Main Application
 * Application initialization and orchestration
 */

class RiyadhMapApp {
    constructor() {
        this.initialized = false;
    }

    /**
     * Initialize the application
     */
    async init() {
        console.log('🏙️ Initializing Downtown Riyadh Interactive Map...');

        try {
            // Show loading screen
            UIController.showLoading();

            // Initialize UI controller
            UIController.init();

            // Load landmarks data
            await this.loadData();

            // Initialize map
            window.onMapReady = () => this.onMapReady();
            MapController.init();

        } catch (error) {
            console.error('Failed to initialize application:', error);
            this.handleError(error);
        }
    }

    /**
     * Load landmarks data from JSON
     */
    async loadData() {
        try {
            const response = await fetch(CONFIG.dataPath);

            if (!response.ok) {
                throw new Error(`Failed to load data: ${response.status}`);
            }

            STATE.data = await response.json();
            console.log(`✓ Loaded ${STATE.data.landmarks.length} landmarks`);

            return STATE.data;

        } catch (error) {
            console.error('Error loading data:', error);
            throw error;
        }
    }

    /**
     * Called when map is ready
     */
    onMapReady() {
        console.log('✓ Map initialized');

        // Add markers
        if (STATE.data && STATE.data.landmarks) {
            MapController.addMarkers(STATE.data.landmarks);
            MapController.filterMarkers();
            console.log(`✓ Added ${STATE.data.landmarks.length} markers`);
        }

        // Initialize tour
        if (STATE.data && STATE.data.landmarks) {
            TourController.init(STATE.data.landmarks);
            console.log('✓ Tour initialized');
        }

        // Show welcome message
        setTimeout(() => {
            UIController.showWelcome();
        }, 500);

        // Hide loading screen
        UIController.hideLoading();

        // Mark as initialized
        this.initialized = true;

        console.log('🎉 Application ready!');
        this.printWelcomeMessage();
    }

    /**
     * Handle application errors
     */
    handleError(error) {
        console.error('Application error:', error);

        // Show error message to user
        const loading = document.getElementById('loading');
        if (loading) {
            loading.innerHTML = `
                <div style="text-align: center; color: var(--color-text-primary);">
                    <h2 style="margin-bottom: 1rem;">Failed to Load</h2>
                    <p style="color: var(--color-text-secondary);">
                        ${error.message || 'An error occurred while loading the application.'}
                    </p>
                    <button
                        onclick="location.reload()"
                        style="
                            margin-top: 2rem;
                            padding: 0.75rem 1.5rem;
                            background: var(--color-accent-primary);
                            color: var(--color-bg-primary);
                            border: none;
                            border-radius: 8px;
                            font-weight: 600;
                            cursor: pointer;
                        "
                    >
                        Retry
                    </button>
                </div>
            `;
        }
    }

    /**
     * Print welcome message to console
     */
    printWelcomeMessage() {
        const styles = [
            'color: #d4af37',
            'font-size: 14px',
            'font-weight: bold'
        ].join(';');

        console.log('%c┌─────────────────────────────────────────┐', styles);
        console.log('%c│  DOWNTOWN RIYADH — INTERACTIVE MAP     │', styles);
        console.log('%c│  Vision 2030 • Urban Visualization     │', styles);
        console.log('%c└─────────────────────────────────────────┘', styles);
        console.log('\n%cKeyboard Shortcuts:', 'font-weight: bold; color: #9ca3af;');
        console.log('  Space  — Start/Stop Tour');
        console.log('  ←/→    — Navigate Tour');
        console.log('  T      — Toggle Theme');
        console.log('  R      — Reset View');
        console.log('  Esc    — Close Panel\n');
    }

    /**
     * Get application statistics
     */
    getStats() {
        if (!this.initialized) {
            return { status: 'not initialized' };
        }

        return {
            status: 'ready',
            landmarks: STATE.data?.landmarks.length || 0,
            markers: STATE.markers.length,
            activeLayers: Array.from(STATE.activeLayers),
            theme: STATE.currentTheme,
            tourActive: STATE.tourActive,
            tourStops: STATE.tourStops.length,
            mapCenter: STATE.map.getCenter(),
            mapZoom: STATE.map.getZoom().toFixed(2)
        };
    }
}

// Initialize application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.app = new RiyadhMapApp();
        window.app.init();
    });
} else {
    window.app = new RiyadhMapApp();
    window.app.init();
}

// Expose app globally for debugging
window.RiyadhMapApp = RiyadhMapApp;
