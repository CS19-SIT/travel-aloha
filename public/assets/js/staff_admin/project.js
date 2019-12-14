function newProject(id) {
    let [nproj, dproj] = ['', ''];
    Swal.fire({
        title: 'Create new project',
        html: `
            <ins>Project name</ins>
            <input id="namep" type="text" class="form-control mt-2" maxlength="20" placeholder="project name" value="">
            <ins>Detail of the project</ins>
            <textarea id="detailp" class="form-control mt-2" rows="3" maxlength="100" style="resize: none;" placeholder="project detail"></textarea>
        `,
        showCancelButton: true,
        confirmButtonText: 'submit the form',
        preConfirm: () => {
            nproj = namep.value || '';
            dproj = detailp.value || '';
            if (!nproj || !dproj) {
                Swal.showValidationMessage('Please type all information');
            }
        }
    }).then((act) => {
        if (act.value) {
            try {
                $.ajax({
                    url: '/admin/staff/getQuery',
                    method: 'POST',
                    data: {
                        sql: `SELECT 1 FROM staff_manager WHERE staffId='${id}'`
                    }
                }).done((result) => {
                    console.log(JSON.stringify(result));
                    if (result.status == 200 && !!result.data.length) {
                        $.ajax({
                            url: '/admin/staff/sendQuery',
                            method: 'POST',
                            data: {
                                sql: `INSERT INTO staff_project(projectName, projectDetail, ownerId, startDate) VALUES ('${nproj}', '${dproj}', '${id}', NOW())`
                            }
                        }).done((result) => {
                            if (result.status == 200) {
                                location.reload(true);
                            } else {
                                throw new Error(result.message);
                            }
                        });
                    } else {
                        throw new Error('Regular staffs aren\'t allow to create a project');
                    }
                });
            } catch (err) {
                Swal.fire({
                    title: JSON.stringify(err),
                    icon: 'error',
                    showConfirmButton: false
                });
                setTimeout(() => location.reload(true), 1500);
            }
        }
    });
}

function deleteProject(id) {
    Swal.fire({
        title: 'Are you sure',
        text: 'data in the project will be deleted',
        icon: 'warning',
        showCancelButton: true
    }).then((act) => {
        if (act.value) {
            $.ajax({
                url: '/admin/staff/sendQuery',
                method: 'POST',
                data: {
                    sql: `DELETE FROM staff_project_timeline WHERE projectId='${id}'`
                }
            }).done((result) => {
                if (result.status == 200) {
                    $.ajax({
                        url: '/admin/staff/sendQuery',
                        method: 'POST',
                        data: {
                            sql: `DELETE FROM staff_project WHERE projectId='${id}'`
                        }
                    }).done((result) => {
                        location.reload(true);
                    })
                } else {
                    location.reload(true);
                }
            });     
        }
    });
}

function closeProject(id) {
    Swal.fire({
        title: 'Are you sure',
        text: 'you will not be able to update the project anymore',
        icon: 'warning',
        showCancelButton: true
    }).then((act) => {
        if (act.value) {
            $.ajax({
                url: '/admin/staff/sendQuery',
                method: 'POST',
                data: {
                    sql: `UPDATE staff_project SET finishDate=NOW() WHERE projectId='${id}'`
                }
            }).done((result) => {
                location.reload(true);
            })     
        }
    });
}
