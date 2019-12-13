const app = angular.module('requisition', []);

app.controller('requisitionController', [
    '$scope',
    '$http',
    function($scope, $http) {
        const self = this;
        
        self.getQuery = (data) => $http({
            url: '/admin/staff/getQuery',
            method: 'POST',
            data: data
        }).then((res) => res.data);
        self.sendQuery = (data) => $http({
            url: '/admin/staff/sendQuery',
            method: 'POST',
            data: data
        }).then((res) => res.data);
    }
]);
