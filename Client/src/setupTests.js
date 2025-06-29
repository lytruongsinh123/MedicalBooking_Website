// src/setupTests.js

window.matchMedia =
    window.matchMedia ||
    function (query) {
        return {
            matches: query.includes("(min-width: 768px)"), // Example condition for responsive tests
            media: query,
            onchange: null,
            addListener: function (callback) {
                this.onchange = callback;
            },
            removeListener: function () {
                this.onchange = null;
            },
            addEventListener: function (type, listener) {
                if (type === "change") this.onchange = listener;
            },
            removeEventListener: function (type) {
                if (type === "change") this.onchange = null;
            },
            dispatchEvent: function (event) {
                if (this.onchange) this.onchange(event);
            },
        };
    };
