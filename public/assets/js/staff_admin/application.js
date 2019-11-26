const app = angular.module('applicationPage', [])


app.controller('applicationPageController', [
    '$scope',
    '$http',
    function($scope, $http) {
        this.haha = 3;
        $scope.overviewConfirm = false
        $scope.deptList = []
        $scope.roleList = []
        $http({
            url: '/admin/staff/getQuery',
            method: 'POST',
            data: {
                sql: 'SELECT deptNo, deptName FROM staff_department'
            }
        }).then(function(response) {
            if (response.data.status == 200) {
                $scope.deptList = response.data.result
            } 
        })
        $scope.generateRole = function(dept) {
            $http({
                url: '/admin/staff/getQuery',
                method: 'POST',
                data: {
                    sql: `SELECT roleId, roleName, roleDetail FROM staff_role WHERE deptNo='${dept.deptNo}'`
                }
            }).then(function(response) {
                if (response.data.status == 200) {
                    $scope.roleList = response.data.result
                } 
            })
        }
        // $scope.test = function(){
        //     SweetAlert.swal("HAHAYES");
        // }
    }
])
