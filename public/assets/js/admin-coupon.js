$(document).ready(function () {
  $("select[multiple='multiple'].coupon-level-select").select2({
    width: '100%'
  });

  $("#view-edit-button").click(function (e) {
    const button = $(this);
    const code = button.data("coupon-code");

    $("#viewModal").on("hidden.bs.modal", (e) => {
      $("#editModal").data("coupon-code", code);
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

    $.ajax({
      type: "PUT",
      url: "/admin/coupon/new",
      data: $(this).serialize()
    }).done(() => {
      alert("Success!");
      location.reload();
    });
  });

  $("#editModal").on("show.bs.modal", function (e) {
    const button = $(e.relatedTarget);
    let coupon = button.data("coupon");;

    if (coupon == null) {
      const code = button.data("coupon-code") || $(this).data("coupon-code");
      const node = $("button[data-coupon]").filter((i, e) => $(e).data("coupon-code") == code);
      coupon = node.data("coupon");
    }

    const modal = $(this);
    const form = modal.find("form");

    const find = name => form.find("input[name=" + name + "]");

    for (const key in coupon) {
      find(key).val(coupon[key]);
    }

    find("start_date").get(0).valueAsDate = new Date(coupon["start_date"]);
    find("expire_date").get(0).valueAsDate = new Date(coupon["expire_date"]);
    find("for_every_hotel").prop("checked", coupon.for_every_hotel);
    find("for_every_airline").prop("checked", coupon.for_every_airline);
    form.find('select[name="levels"]').val(coupon.levels).trigger("change");
  });

  $("#deleteModalForm").submit(function (e) {
    e.preventDefault();

    const form = $(this);

    $.ajax({
      type: "DELETE",
      url: "/admin/coupon/delete/" + form.data("coupon-code"),
      data: form.serialize()
    }).done(() => {
      alert("Success!");
      location.reload();
    });
  })
});
