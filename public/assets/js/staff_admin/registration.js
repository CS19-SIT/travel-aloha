const app = angular.module('registration', []);

app.controller('registrationController', [
    '$scope',
    '$http',
    function($scope, $http) {
        const self = this;
        self.cancelForm = () => console.log(1);
        self.deptList = [];
        self.roleList = [];
        self.selectedDetail = ''; 
        $http({
            url: '/admin/staff/getQuery',
            method: 'POST',
            data: {
                sql: `SELECT deptNo, deptName FROM staff_department ORDER BY deptName`
            }
        }).then((res) => {
            if (res.data.status == 200) {
                self.deptList = res.data.data;
                $scope.selectedDept = self.deptList[0];
                self.loadNewRoles(self.deptList[0]);
            }
        });
        self.loadNewRoles = (dept) => {
            if (!dept) return;
            self.selectedDetail = '';
            $http({
                url: '/admin/staff/getQuery',
                method: 'POST',
                data: {
                    sql: `SELECT roleId, roleName FROM staff_role WHERE deptNo='${dept.deptNo}'`
                }
            }).then((res) => {
                if (res.data.status == 200) {
                    self.roleList = res.data.data; 
                    $scope.selectedRole = self.roleList[0];
                    self.loadRoleDetail(dept, self.roleList[0])
                }
            });
        };
        self.loadRoleDetail = (dept, role) => {
            if (!role) return;
            $http({
                url: '/admin/staff/getQuery',
                method: 'POST',
                data: {
                    sql: `SELECT roleDetail FROM staff_role WHERE DeptNo='${dept.deptNo}' AND roleId='${role.roleId}'`
                }
            }).then((res) => {
                if (res.data.status == 200) {
                    self.selectedDetail = res.data.data[0].roleDetail;
                }
            });
        };
    }
]);
