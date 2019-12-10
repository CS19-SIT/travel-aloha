var windowHeight = document.body.clientHeight;
setTimeout(() => {
    if (document.body.clientHeight != windowHeight) {
        AOS.refresh();
    } else {
        windowHeight = document.body.clientHeight;
    }
}, 1000);

function reloadRolesList(elem) {
    $.ajax({
        url: '/admin/staff/getQuery', method: 'POST',
        data: {
            sql: `SELECT  * FROM staff_role WHERE deptNo='${elem.value}'`
        }
    }).done((result) => {
        if (result.status == 200) {
            if (!result.data.length) {
                result.data = 'No available role'
            }
            document.getElementById('rolesDetail').textContent = JSON.stringify(result.data);
        }
    });
}
