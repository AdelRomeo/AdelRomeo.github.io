jQuery(document).ready(function () {
    /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    particlesJS.load('particl', 'src/scripts/particles.json', function() { // путь относительно index.html
        console.log('callback - particles.js config loaded');
    });
});