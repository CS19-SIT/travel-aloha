Array.prototype.forEach.call(document.getElementsByClassName('approve'), (item) => {
    item.addEventListener('click', function() {
        const cddCard = this.parentNode.parentNode.parentNode;
        const userId = this.parentNode.parentNode.getElementsByClassName('userid')[0].textContent;
        const deptNo = this.parentNode.parentNode.getElementsByClassName('deptno')[0].textContent;
        const roleId = this.parentNode.parentNode.getElementsByClassName('roleid')[0].textContent;
        let [salary, responseMessage] = [1, ''];
        Swal.fire({
            title: `Approved Form`,
            html: `
                Salary:<br>
                <input id="money" type="number" class="form-control mb-3" value="15000" placeholder="input the salary">
                ResponseMessage:<br>
                <textarea id="message" class="form-control" rows="2" maxlength="30" style="resize: none;" placeholder="say something"></textarea>
            `,
            confirmButtonColor: '#28a745',
            showCancelButton: true,
            preConfirm: () => {
                try {
                    responseMessage = message.value || '';
                    if (money.value < 1 || parseInt(money.value, 10) != money.value) {
                        throw 'Salary should be positive integers';
                    } else {
                        salary = parseInt(money.value, 10);
                    }
                } catch (err) {
                    Swal.showValidationMessage(`Wrong format: ${JSON.stringify(err)}`);
                }
            }
        }).then((act) => {
            if (act.value) {
                $.ajax({
                    url: '/admin/staff/getQuery',
                    method: 'POST',
                    data: {
                        sql: `SELECT 1 FROM staff_registration WHERE userId='${userId}' AND status='pending'`
                    }
                }).done((result) => {
                    if (result.status == 200 && !!result.data.length) {
                        $.ajax({
                            url: '/admin/staff/sendQuery',
                            method: 'POST',
                            data: {
                                sql: `UPDATE staff_registration SET status='approved', responseMessage='${responseMessage.trim().replace(/ {1,}/g, ' ').replace(/'/g, "\\'")}' WHERE userId='${userId}' AND status='pending'`
                            }
                        }).done((result) => {
                            if (result.status == 200) {
                                $.ajax({
                                    url: '/admin/staff/sendQuery',
                                    method: 'POST',
                                    data: {
                                        sql: `INSERT INTO staff_info(staffId, deptNo, roleId, salary, bio, latestCheckIn, status) VALUES ('${userId}', '${deptNo}', ${roleId}, ${salary}, '', NULL, 'unident') ON DUPLICATE KEY UPDATE deptNo=VALUES(deptNo), roleId=VALUES(roleId), salary=VALUES(salary), bio='', latestCheckIn=NULL, status='unident'`
                                    }
                                }).done((result) => {
                                    if (result.status == 200) {
                                        Swal.fire('Completed', 'everything works', 'success');
                                        cddCard.parentNode.removeChild(cddCard);
                                    } else {
                                        Swal.fire({
                                            title: 'Something went wrong',
                                            text: `${JSON.stringify(result.message)}`,
                                            icon: 'error',
                                            showConfirmButton: false
                                        });
                                        setTimeout(() => location.reload(true), 150000);
                                    }
                                })
                            } else {
                                Swal.fire({
                                    title: 'Something went wrong',
                                    text: `${JSON.stringify(result.message)}`,
                                    icon: 'error',
                                    showConfirmButton: false
                                });
                                setTimeout(() => location.reload(true), 1500);
                            }
                        })
                    } else {
                        Swal.fire('Error', 'user wasn\'t in the data', 'error');
                        cddCard.parentNode.removeChild(cddCard);
                    }
                });
            }
        });
    })
});

Array.prototype.forEach.call(document.getElementsByClassName('reject'), (item) => {
    item.addEventListener('click', function() {
        const cddCard = this.parentNode.parentNode.parentNode;
        const userId = this.parentNode.parentNode.getElementsByClassName('userid')[0].textContent;
        let responseMessage = ''; 
        Swal.fire({
            title: `Rejected Form`,
            html: `
                <textarea id="message" class="form-control" rows="2" maxlength="30" style="resize: none;" placeholder="please give some reason"></textarea>
            `,
            confirmButtonColor: '#dc3545',
            showCancelButton: true,
            preConfirm: () => {
                responseMessage = message.value || '';
            }
        }).then((act) => {
            if (act.value) {
                $.ajax({
                    url: '/admin/staff/getQuery',
                    method: 'POST',
                    data: {
                        sql: `SELECT 1 FROM staff_registration WHERE userId='${userId}' AND status='pending'`
                    }
                }).done((result) => {
                    if (result.status == 200 && result.data) {
                        $.ajax({
                            url: '/admin/staff/sendQuery',
                            method: 'POST',
                            data: {
                                sql: `UPDATE staff_registration SET status='rejected', responseMessage='${responseMessage.trim().replace(/ {1,}/g, ' ').replace(/'/g, "\\'")}' WHERE userId='${userId}' AND status='pending'`
                            }
                        }).done((result) => {
                            if (result.status == 200) {
                                Swal.fire('Completed', 'everything works', 'success');
                                cddCard.parentNode.removeChild(cddCard);
                            } else {
                                Swal.fire({
                                    title: 'Something went wrong',
                                    text: `${JSON.stringify(result.message)}`,
                                    icon: 'error',
                                    showConfirmButton: false
                                });
                                setTimeout(() => location.reload(true), 1500);
                            }
                        })
                    } else {
                        Swal.fire('Error', 'user wasn\'t in the data', 'error');
                        cddCard.parentNode.removeChild(cddCard);
                    }
                });
            }
        });
    })
});

Array.prototype.forEach.call(document.getElementsByClassName('looking'), (item) => {
    item.addEventListener('click', function() {
        const cddCard = this.parentNode.parentNode.parentNode;
        const userId = this.parentNode.parentNode.getElementsByClassName('userid')[0].textContent;
        $.ajax({
            url: '/admin/staff/getQuery',
            method: 'POST',
            data: {
                sql: `SELECT resume FROM staff_registration WHERE userId='${userId}'`
            }
        }).done((result) => {
            if (result.status == 200 && !!result.data.length) {
                Swal.fire({
                    title: 'Resume',
                    html: `
                        <textarea id="message" class="form-control font-weight-light" rows="2" maxlength="100" 
                        style="resize: none;" readonly>${result.data[0].resume || 'No information'}</textarea>
                    `,
                });
            } else {
                Swal.fire({
                    title: 'Something went wrong',
                    text: 'No available information',
                    icon: 'error'
                });
                cddCard.parentNode.removeChild(cddCard);
            }
        })
    })
});
