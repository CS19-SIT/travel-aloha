$(document).ready(function() {
    $("select[multiple='multiple'].coupon-level-select").select2({
        width: '100%'
    });
});

$("#view-edit-button").click((ev) => {
    $("#viewModal").on("hidden.bs.modal", (e) => {
        $("#editModal").modal('show');
        $("#viewModal").off("hidden.bs.modal");
    });
    $("#viewModal").modal('hide');
});

$("#view-delete-button").click((ev) => {
    $("#viewModal").on("hidden.bs.modal", (e) => {
        $("#deleteModal").modal('show');
        $("#viewModal").off("hidden.bs.modal");
    });
    $("#viewModal").modal('hide');
});
