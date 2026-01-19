/**
 * DOWNTOWN RIYADH — UI Controller
 * Handles all UI interactions and panel updates
 */

const UIController = {
    elements: {},

    /**
     * Initialize UI controller and attach event listeners
     */
    init() {
        // Cache DOM elements
        this.cacheElements();

        // Attach event listeners
        this.attachEventListeners();

        // Set initial state
        this.updateLayerToggles();
    },

    /**
     * Cache frequently accessed DOM elements
     */
    cacheElements() {
        this.elements = {
            infoPanel: document.getElementById('infoPanel'),
            infoTitle: document.getElementById('infoTitle'),
            infoCategory: document.getElementById('infoCategory'),
            infoDescription: document.getElementById('infoDescription'),
            infoSignificance: document.getElementById('infoSignificance'),
            closeInfo: document.getElementById('closeInfo'),
            tourButton: document.getElementById('tourButton'),
            themeToggle: document.getElementById('themeToggle'),
            resetView: document.getElementById('resetView'),
            loading: document.getElementById('loading'),
            layerToggles: document.querySelectorAll('.layer-toggle'),
            tourControls: document.getElementById('tourControls')
        };
    },

    /**
     * Attach event listeners to UI elements
     */
    attachEventListeners() {
        // Layer toggles
        this.elements.layerToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                this.onLayerToggle(toggle);
            });
        });

        // Close info panel
        this.elements.closeInfo.addEventListener('click', () => {
            this.hideInfoPanel();
        });

        // Theme toggle
        this.elements.themeToggle.addEventListener('click', () => {
            this.onThemeToggle();
        });

        // Reset view
        this.elements.resetView.addEventListener('click', () => {
            MapController.resetView();
            this.hideInfoPanel();
        });

        // Tour button
        this.elements.tourButton.addEventListener('click', () => {
            this.onTourToggle();
        });

        // Close info panel when clicking outside
        this.elements.infoPanel.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
    },

    /**
     * Handle layer toggle click
     */
    onLayerToggle(toggle) {
        const layer = toggle.dataset.layer;

        // Toggle active state
        toggle.classList.toggle('active');

        // Update state
        if (STATE.activeLayers.has(layer)) {
            STATE.activeLayers.delete(layer);
        } else {
            STATE.activeLayers.add(layer);
        }

        // Filter markers
        MapController.filterMarkers();
    },

    /**
     * Handle theme toggle
     */
    onThemeToggle() {
        const newTheme = MapController.toggleTheme();
        const themeButton = this.elements.themeToggle;
        const icon = themeButton.querySelector('.button-icon');
        const label = themeButton.querySelector('.button-label');

        if (newTheme === 'light') {
            icon.textContent = '🌙';
            label.textContent = 'Night Mode';
        } else {
            icon.textContent = '☀';
            label.textContent = 'Day Mode';
        }
    },

    /**
     * Handle tour toggle
     */
    onTourToggle() {
        if (STATE.tourActive) {
            TourController.stop();
        } else {
            TourController.start();
        }
    },

    /**
     * Update tour button state
     */
    updateTourButton(isActive) {
        const button = this.elements.tourButton;
        const icon = button.querySelector('.button-icon');
        const label = button.querySelector('.button-label');

        if (isActive) {
            icon.textContent = '⏸';
            label.textContent = 'Stop Tour';
            button.style.background = 'var(--color-accent-primary)';
            button.style.color = 'var(--color-bg-primary)';
        } else {
            icon.textContent = '▶';
            label.textContent = 'Start Guided Tour';
            button.style.background = '';
            button.style.color = '';
        }
    },

    /**
     * Update layer toggle states
     */
    updateLayerToggles() {
        this.elements.layerToggles.forEach(toggle => {
            const layer = toggle.dataset.layer;
            toggle.classList.toggle('active', STATE.activeLayers.has(layer));
        });
    },

    /**
     * Show landmark information in info panel
     */
    showLandmarkInfo(landmark) {
        this.elements.infoTitle.textContent = landmark.name;
        this.elements.infoCategory.textContent = landmark.category.toUpperCase();
        this.elements.infoDescription.textContent = landmark.description;
        this.elements.infoSignificance.textContent = landmark.significance;

        // Show panel
        this.elements.infoPanel.classList.remove('hidden');

        // Hide tour controls if not in tour
        if (!STATE.tourActive) {
            this.elements.tourControls.style.display = 'none';
        }

        // Highlight marker
        MapController.highlightMarker(landmark.id);
    },

    /**
     * Hide info panel
     */
    hideInfoPanel() {
        this.elements.infoPanel.classList.add('hidden');
        MapController.clearHighlights();
    },

    /**
     * Show tour controls in info panel
     */
    showTourControls() {
        this.elements.tourControls.style.display = 'flex';
    },

    /**
     * Hide tour controls
     */
    hideTourControls() {
        this.elements.tourControls.style.display = 'none';
    },

    /**
     * Show loading screen
     */
    showLoading() {
        this.elements.loading.classList.remove('hidden');
    },

    /**
     * Hide loading screen
     */
    hideLoading() {
        setTimeout(() => {
            this.elements.loading.classList.add('hidden');
        }, 500);
    },

    /**
     * Handle keyboard shortcuts
     */
    handleKeyboard(e) {
        // Escape - close info panel or stop tour
        if (e.key === 'Escape') {
            if (STATE.tourActive) {
                TourController.stop();
            } else {
                this.hideInfoPanel();
            }
        }

        // Space - toggle tour
        if (e.key === ' ' && e.target.tagName !== 'INPUT') {
            e.preventDefault();
            this.onTourToggle();
        }

        // Arrow keys - tour navigation
        if (STATE.tourActive) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                TourController.next();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                TourController.prev();
            }
        }

        // T - toggle theme
        if (e.key === 't' || e.key === 'T') {
            this.onThemeToggle();
        }

        // R - reset view
        if (e.key === 'r' || e.key === 'R') {
            MapController.resetView();
            this.hideInfoPanel();
        }
    },

    /**
     * Show welcome message
     */
    showWelcome() {
        this.elements.infoTitle.textContent = 'Downtown Riyadh';
        this.elements.infoCategory.textContent = 'VISION 2030';
        this.elements.infoDescription.textContent =
            'Explore the transformation of Downtown Riyadh into a modern global hub. ' +
            'Toggle layers to discover landmarks, business districts, and cultural spaces. ' +
            'Click on markers to learn more, or start the guided tour for a curated experience.';
        this.elements.infoSignificance.textContent =
            'Part of Saudi Arabia\'s Vision 2030, Downtown Riyadh represents the convergence ' +
            'of economic ambition, architectural innovation, and cultural evolution.';

        this.elements.infoPanel.classList.remove('hidden');
        this.elements.tourControls.style.display = 'none';
    }
};

// Make UIController globally accessible
window.UIController = UIController;
