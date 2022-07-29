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
    .less('resources/less/style.less', 'resources/css/');

mix.styles([
    'resources/css/reset.css',
    'resources/css/variables.css',
    'resources/css/fonts.css',
    'resources/css/icons.css',
    'resources/vendor/jquery-ui-1.13.1.custom/jquery-ui.structure.min.css',
    'resources/css/style.css'
], 'public/css/all.css');

mix.scripts([
    'resources/vendor/jquery-3.5.1.min.js',
    'resources/vendor/jquery-ui-1.13.1.custom/jquery-ui.min.js',
    'resources/js/helpers.js',
    'resources/js/js.js'
], 'public/js/all.js');

