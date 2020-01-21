jQuery(document).ready(function () {
    /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    particlesJS.load('particl', '/scripts/particles.json', function() {
        console.log('callback - particles.js config loaded');
    });
});