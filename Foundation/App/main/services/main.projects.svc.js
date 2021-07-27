﻿
/*
*
*/

(function () {
    'use strict';
    angular.module('app.main').factory('main.projects.svc', svc);

    svc.$inject = ['$httpParamSerializer', '$http', '$window', 'core.settings'];

    function svc($httpParamSerializer, $http, $window, settings) {
        return {
            search: search,
            get: get

        }

        

        function search(filter) {
            return $http.get(settings.apiUrl + '/projects/search/?' + $httpParamSerializer(filter));
        }
        function get(id) {
            return $http.get(settings.apiUrl + '/projects/' + id);
        }
       
    }

})();
