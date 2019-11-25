const app = angular.module('indexPage', [])

app.controller('indexPageController', [
    '$scope',
    '$http',
    function($scope, $http) {
        $scope.overviewConfirm = false
        $scope.deptList = []
        $scope.roleList = []
        $scope.generateRole = function(deptNo) {
            $http({
                url: '/admin/staff/getQuery',
                method: 'POST',
                data: {
                    sql: `SELECT roleName, roleDetail FROM staff_role WHERE deptNo='${deptNo}'`
                }
            }).then(function(response) {
                if (response.data.status == 200) {
                    $scope.roleList = response.data.result
                } 
            })
        }

        $scope.showLandingPage = function() {
            if ($scope.overviewConfirm == false) {
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
            }
            $scope.overviewConfirm = true
            setTimeout(function() {
                document.getElementById('myOverview').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            }, 190)
        }
    }
])