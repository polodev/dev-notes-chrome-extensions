let mix = require('laravel-mix');
mix.js('js/dev-notes.react.js', 'dist/panel')
   .react()
   .options({ manifest: false })
   .disableNotifications();