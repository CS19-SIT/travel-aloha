var windowHeight = document.body.clientHeight;
setTimeout(() => {
    if (document.body.clientHeight != windowHeight) {
        AOS.refresh();
    } else {
        windowHeight = document.body.clientHeight;
    }
}, 1000);

function lookupDetails(index) {
    const prevSelectedDept = document.getElementById('deptListSelect').selectedIndex;
    if (prevSelectedDept != parseInt(index, 10)) {
        document.getElementById('deptListSelect').selectedIndex = parseInt(index, 10);
        document.getElementById('deptListSelect').dispatchEvent(new Event('change'));
    }
}

function reloadRolesList(elem) {
    $.ajax({
        url: '/admin/staff/getQuery', method: 'POST',
        data: {
            sql: `SELECT roleName, roleDetail FROM staff_role WHERE deptNo='${elem.value}'`
        }
    }).done((result) => {
        if (result.status == 200) {
            if (!result.data.length) {
                document.getElementById('rolesDetail').innerHTML = 'No available role';
            } else {
                document.getElementById('rolesDetail').innerHTML = result.data.map((item, index) => {
                    return `<p class="font-weight-bold">${index+1}) ${item.roleName}</p><p class="text-break">${item.roleDetail}</p>`;
                }).join('');
            }
        }
    });
}