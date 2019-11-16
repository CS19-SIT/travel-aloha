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
    
    $("#view-delete-button").click(function (e) {
        const button = $(this);
        const code = button.data("coupon-code");

        $("#viewModal").on("hidden.bs.modal", function (e) {
            $("#deleteModal").data("coupon-code", code);
            $("#deleteModal").modal('show');
            $("#viewModal").off("hidden.bs.modal");
        });
        $("#viewModal").modal('hide');
    });

    $("#viewModal").on("show.bs.modal", function (e) {
        const button = $(e.relatedTarget);
        const code = button.data("coupon-code");
        const modal = $(this);

        $("#view-edit-button").data("coupon-code", code);
        $("#view-delete-button").data("coupon-code", code);
    });

    $("#deleteModal").on("show.bs.modal", function (e) {
        const button = $(e.relatedTarget);
        const code = button.data("coupon-code") || $(this).data("coupon-code");
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
