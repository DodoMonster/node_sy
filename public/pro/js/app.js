angular.module('syApp', [
    'ngAnimate',
    'ui.router',
    'oc.lazyLoad',
    'ngTable',
    'ui.bootstrap',
    'ngResource',
    'toaster',
]);
angular.module('syApp').constant('_', window._);

function alertSuccess() {
    alert('filed');
}