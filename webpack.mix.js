const mix = require('laravel-mix');

mix.options({
    processCssUrls: false
});

mix.copy('resources/img/', 'public/img/');

mix
    .less('resources/less/reset.less', 'resources/css/')
    .less('resources/less/variables.less', 'resources/css/')
    .less('resources/less/fonts.less', 'resources/css/')
    .less('resources/less/icons.less', 'resources/css/')
    .less('resources/less/style.less', 'resources/css/')
    .less('resources/less/mobile.less', 'resources/css/');

mix.styles([
    'resources/css/reset.css',
    'resources/css/variables.css',
    'resources/css/fonts.css',
    'resources/css/icons.css',
    'resources/vendor/simplebar/simplebar.css',
    'resources/vendor/magnific-popup/magnific-popup.css',
    'resources/vendor/flatpickr/flatpickr.min.css',
    'resources/css/style.css',
    'resources/css/mobile.css'
], 'public/css/all.css');

mix.scripts([
    'resources/vendor/jquery-3.5.1.min.js',
    'resources/vendor/simplebar/simplebar.min.js',
    'resources/vendor/magnific-popup/magnific-popup.min.js',
    'resources/vendor/flatpickr/flatpickr.js',
    'resources/vendor/flatpickr/ru.js',
    'resources/vendor/cleave.min.js',
    'resources/vendor/select2.full.min.js',
    'resources/vendor/jquery.nicescroll.min.js',
    'resources/js/helpers.js',
    'resources/js/js.js'
], 'public/js/all.js');

