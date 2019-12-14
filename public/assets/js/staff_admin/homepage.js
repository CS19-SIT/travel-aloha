const app = angular.module('home', []);

app.controller('homeController', [
    '$scope',
    '$http',
    function($scope, $http) {
        const self = this;
        
        $scope.viewedStaff = null;
        $scope.devModeOn = false;
        self.roleList = [];
        [$scope.newDept, $scope.newRole] = [false, false];

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

        self.openDevMode = () => {
            $scope.devModeOn = true;
        };
        self.updateViewedStaff = (staff) => {
            $scope.viewedStaff = null;
            setTimeout(() => {
                $scope.viewedStaff = staff;
                self.updateDept({deptNo: staff.deptNo, deptName: staff.deptName});
            }, 100);
        };
        self.updateInfo = (staff, dept, role, salary) => {
            try {
                if (dept && role && salary > 0) {
                    if (staff.isManager == 'true') {
                        self.sendQuery({
                            sql: `UPDATE staff_info SET salary=${salary} WHERE staffId='${staff.user_id}'`
                        }).then((result) => {
                            if (result.status == 200) {
                                self.setNewStaffList();
                            } else {
                                throw new Error(result.message);
                            }
                        });
                    } else {
                        self.getQuery({
                            sql: `SELECT 1 FROM staff_manager WHERE staffId='${staff.user_id}'`
                        }).then((result) => {
                            if (result.status == 200 && !result.data.length) {
                                self.sendQuery({
                                    sql: `UPDATE staff_info SET deptNo='${dept.deptNo}', roleId='${role.roleId}', salary=${salary} WHERE staffId='${staff.user_id}'`
                                }).then((result) => {
                                    if (result.status == 200) {
                                        self.setNewStaffList();
                                    } else {
                                        throw new Error(result.message);
                                    }
                                });
                            } else {
                                alert('you can\'t change department of managers');
                                self.setNewStaffList();
                            }
                        });
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };
        self.cancelView = () => {
            $scope.viewedStaff = null;
        };
        self.closeDevMode = () => {
            $scope.devModeOn = false;
            self.cancelView();
        };
        self.updateDept = (dept) => {
            $scope.newDept = dept;
            $scope.newRole = false;
            self.getQuery({
                sql: `SELECT roleId, roleName FROM staff_role WHERE deptNo='${dept.deptNo}'`
            }).then((result) => {
                if (result.status == 200) {
                    self.roleList = result.data;
                    $scope.newRole = self.roleList[0];
                }
            });
        };
        self.updateRole = (role) => {
            $scope.newRole = role;
        }

        self.setNewStaffList = () => {
            self.getQuery({
                sql: `SELECT user_id, IF(profile_picture IS NULL, '', profile_picture) AS profile_picture, CONCAT(firstname, ' ', lastname) AS name, sr.deptNo, deptName, sr.roleId, roleName, salary, latestCheckIn,
                    CASE WHEN EXISTS(SELECT 1 FROM staff_manager sm WHERE sm.staffId=si.staffId)
                        THEN 'true'
                        ELSE 'false'
                    END AS isManager  
                    FROM user u, staff_info si, staff_department sd, staff_role sr 
                    WHERE	si.status='active'
                        AND si.staffId=u.user_id
                        AND si.deptNo=sd.deptNo 
                        AND sd.deptNo=sr.deptNo
                        AND si.roleId=sr.roleId
                        ORDER BY isManager DESC, latestCheckIn`
            }).then((result) => {
                $scope.staffs = result.data;
                self.cancelView();
            });
        };

        self.upgradeManager = (staff) => {
            try {
                self.getQuery({
                    sql: `SELECT 1 FROM staff_info WHERE staffId='${staff.user_id}' AND deptNo='${staff.deptNo}'`
                }).then((result) => {
                    if (result.status == 200 && !!result.data.length) {
                        self.sendQuery({
                            sql: `INSERT INTO staff_manager VALUES ('${staff.deptNo}', '${staff.user_id}') ON DUPLICATE KEY UPDATE staffId=VALUES(staffId)`
                        }).then((result) => {
                            if (result.status == 200) {
                                self.setNewStaffList();
                            } else {
                                throw new Error(result.message);
                            }
                        });
                    } else {
                        throw 'this staff does not exist in the department';
                    }
                });
            } catch (err) {
                alert(err);
                setTimeout(() => location.reload(true), 1200);
            }
        };

        self.removeStaff = (staff) => {
            confirmMessage = prompt(`Please type "Grandma eats longan and she is dribbing"`);
            if (confirmMessage == 'Grandma eats longan and she is dribbing') {
                $http({
                    url: '/admin/staff/deleteStaff',
                    method: 'POST',
                    data: {
                        deletedid: staff.user_id
                    }
                }).then((res) => res.data).then((result) => {
                    if (result.status == 200) {
                        self.setNewStaffList();
                    } else {
                        alert(`${JSON.stringify(result.message)}`);
                    }
                });
            } else {
                alert('You typed wrong');
            }
        };
    }
]);
