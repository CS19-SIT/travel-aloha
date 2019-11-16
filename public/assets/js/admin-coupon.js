$(document).ready(function() {
    $("select[multiple='multiple'].coupon-level-select").select2({
        width: '100%'
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

    $("#deleteModal").on("show.bs.modal", function (e) {
        const button = $(e.relatedTarget);
        const code = button.data("coupon-code");
        const modal = $(this);
        modal.find(".modal-body p").text('Are you sure to delete coupon "' + code + '"?');
        modal.find("form").data("coupon-code", code);
    });
    
    $("#addModalForm").submit(function (e) {
        e.preventDefault();

        const form = $(this);
        const url = form.attr("action");
        
        $.ajax({
            type: "PUT",
            url: url,
            data: form.serialize(),
            success: () => {
                alert("Success!");
                location.reload();
            }
        });
    });

    $("#deleteModalForm").submit(function (e) {
        e.preventDefault();

        const form = $(this);
        
        $.ajax({
            type: "DELETE",
            url: "/admin/coupon/delete/" + form.data("coupon-code"),
            data: form.serialize(),
            success: () => {
                alert("Success!");
                location.reload();
            }
        });
    })
});
