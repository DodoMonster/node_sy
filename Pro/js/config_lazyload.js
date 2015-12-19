angular.module('syApp')
.config(['$ocLazyLoadProvider', oclazyConfig]);

function oclazyConfig($ocLazyLoadProvider) {
  $ocLazyLoadProvider.config({
    debug:false,
    events:true,
    modules: [
        {
          name: 'test',
          files: ['vendor/octest.js'],
        },
], });
}
