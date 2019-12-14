const app = angular.module('profile', []);

app.controller('profileController', [
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

        self.updateBio = (id) => {
            const newBio = bio.value || '';
            self.sendQuery({
                sql: `UPDATE staff_info SET bio='${newBio.trim().replace(/ {1,}/g, ' ').replace(/'/g, "\\'")}' WHERE staffId='${id}'`
            }).then((result) => {
                location.reload(true);
            });
        }
    }
]);