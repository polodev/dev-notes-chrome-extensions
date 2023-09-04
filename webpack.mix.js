let mix = require('laravel-mix');
mix.js('js/dev-notes.react.js', 'dist/panel')
   .react()
   .disableNotifications();