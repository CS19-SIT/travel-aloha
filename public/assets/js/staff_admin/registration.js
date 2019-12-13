const app = angular.module('registration', []);

app.controller('registrationController', [
    '$scope',
    '$http',
    function($scope, $http) {
        const self = this;
        $scope.resume = '';
        self.deptList = [];
        self.roleList = [];
        self.selectedDetail = 'No available detail';
        
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

        self.identifyForm = (userId) => {
            self.sendQuery({
                sql: `DELETE FROM staff_registration WHERE userId='${userId}'`
            }).then((result) => {
                self.sendQuery({
                    sql: `UPDATE staff_info SET latestCheckIn=NOW() WHERE staffId='${userId}'`
                }).then((result) => {
                    location.reload(true);
                });
            });
        };
        self.withdrawForm = (userId) => {
            try {
                self.sendQuery({
                    sql: `DELETE FROM staff_registration WHERE userId='${userId}'`
                }).then((result) => {
                    self.sendQuery({
                        sql: `DELETE FROM staff_info WHERE staffId='${userId}' AND latestCheckIn IS NULL`
                    }).then((result) => {
                        if (result.status == 400)
                            throw new Error(result.message);
                        location.reload(true);
                    });
                });
            } catch (err) {
                Swal({
                    title: 'Something went wrong',
                    text: `${JSON.stringify(err)}`,
                    icon: 'error',
                    showConfirmButton: false
                });
                setTimeout(() => location.reload(true), 1500);
            }
        };
        self.sendForm = (userId) => {
            let resume = $scope.resume;
            if (!$scope.selectedDept || !$scope.selectedRole || !resume.trim()) {
                Swal.fire('Something is missing', 'you need to fill all information', 'info');
                return;
            }
            Swal.fire({
				title: 'Are you sure',
				text: 'have you checked what you typed carefully',
				icon: 'warning',
				confirmButtonText: 'Yes, I have checked',
				showCancelButton: true
			}).then((action) => {
                if (action.value) {
                    self.sendQuery({
                        sql: `INSERT INTO staff_registration VALUES ('${userId}', '${$scope.selectedDept.deptNo}', ${$scope.selectedRole.roleId}, '${resume.trim().replace(/ {1,}/g, ' ').replace(/'/g, "\\'")}', 'pending', '')`
                    }).then((result) => {
                        Swal.fire({
                            title: (result.status == 200)?'Thank you':'Something went wrong',
                            text: (result.status == 200)?'your application has been sent':`${JSON.stringify(result.message)}`,
                            icon: (result.status == 200)?'success':'error',
                            showConfirmButton: false
                        });
                        setTimeout(() => location.reload(true), 1500);
                    });
                }
            });
        };

        self.getQuery({
            sql: `SELECT deptNo, deptName FROM staff_department ORDER BY deptName`
        }).then((result) => {
            if (result.status == 200) {
                self.deptList = result.data;
                $scope.selectedDept = self.deptList[0];
                self.loadNewRoles(self.deptList[0]);
            }
        });
        self.loadNewRoles = (dept) => {
            if (!dept) return;
            self.selectedDetail = 'No available detail';
            self.getQuery({
                    sql: `SELECT roleId, roleName FROM staff_role WHERE deptNo='${dept.deptNo}'`
            }).then((result) => {
                if (result.status == 200) {
                    self.roleList = result.data; 
                    $scope.selectedRole = self.roleList[0];
                    self.loadRoleDetail(dept, self.roleList[0]);
                }
            });
        };
        self.loadRoleDetail = (dept, role) => {
            if (!role) return;
            self.getQuery({
                sql: `SELECT roleDetail FROM staff_role WHERE DeptNo='${dept.deptNo}' AND roleId='${role.roleId}'`
            }).then((result) => {
                if (result.status == 200 && result.data) {
                    self.selectedDetail = result.data[0].roleDetail;
                }
            });
        };
    }
]);
