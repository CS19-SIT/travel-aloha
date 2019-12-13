$(document).ready(function () {
  $("select[multiple='multiple'].coupon-level-select").select2({
    width: '100%'
  });

  let searchOptionsSelectAjax = function (type) {
    return {
      url: document.location.protocol + "//" + document.location.host + "/admin/coupon/search/" + type,
      data: function (params) {
        return {
          search: params.term || "",
          page: (params.page || 1) - 1
        };
      },
      delay: 250,
      cache: true
    }
  }

  $("select[multiple='multiple'].hotel-select").select2({
    width: '100%',
    ajax: searchOptionsSelectAjax("hotel")
  });

  $("select[multiple='multiple'].airline-select").select2({
    width: '100%',
    ajax: searchOptionsSelectAjax("airline")
  });

  $("input[name=for_every_airline]").change(function (e) {
    $(e.target.form).find(".airline-select").next(".select2-container").toggle(!this.checked);
  });

  $("input[name=for_every_hotel]").change(function (e) {
    $(e.target.form).find(".hotel-select").next(".select2-container").toggle(!this.checked);
  });

  $("#view-edit-button").click(function (e) {
    const button = $(this);
    $("#viewModal").on("hidden.bs.modal", (e) => {
      $("#editModal").modal("show", button);
      $("#viewModal").off("hidden.bs.modal");
    });
    $("#viewModal").modal("hide");
  });

  $("#view-delete-button").click(function (e) {
    const button = $(this);
    $("#viewModal").on("hidden.bs.modal", function (e) {
      $("#deleteModal").modal("show", button);
      $("#viewModal").off("hidden.bs.modal");
    });
    $("#viewModal").modal("hide");
  });

  $("#viewModal").on("show.bs.modal", function (e) {
    const button = $(e.relatedTarget);
    const code = button.data("coupon-code");
    
    $("#view-edit-button").data("coupon-code", code);
    $("#view-delete-button").data("coupon-code", code);
  });

  $("#deleteModal").on("show.bs.modal", function (e) {
    const button = $(e.relatedTarget);
    const code = button.data("coupon-code");
    const modal = $(this);
    modal.find(".modal-body p").text('Are you sure to delete coupon "' + code + '"?');
    modal.find("form").data("coupon-code", code);
  });

  $("#addModal").on("show.bs.modal", function (e) {
    $("input[name=for_every_hotel]").change();
    $("input[name=for_every_airline]").change();
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
    const code = button.data("coupon-code");
    const node = $("a[data-coupon]").filter((i, e) => $(e).data("coupon-code") == code);
    const coupon = node.data("coupon");
    const modal = $(this);
    const form = modal.find("form");
    const find = name => form.find("input[name=" + name + "]");

    form.data("coupon-code", code);

    for (const key of ['code', 'name', 'discount_percentage']) {
      find(key).val(coupon[key]);
    }

    find("start_date").get(0).valueAsDate = new Date(coupon["start_date"]);
    find("expire_date").get(0).valueAsDate = new Date(coupon["expire_date"]);
    find("for_every_hotel").prop("checked", coupon.for_every_hotel);
    find("for_every_airline").prop("checked", coupon.for_every_airline);
    form.find("textarea[name=description]").val(coupon["description"]);
    form.find('select[name="levels"]').val(coupon.levels).change();

    const hotelsSelect = form.find('select[name="hotels"]');
    const airlinesSelect = form.find('select[name="airlines"]');

    $.map(coupon.hotels, function (e) {
      hotelsSelect.append(new Option(e.name, e.id, false, true));
    });

    $.map(coupon.airlines, function (e) {
      airlinesSelect.append(new Option(e.name, e.id, false, true));
    });

    hotelsSelect.change();
    airlinesSelect.change();

    $("input[name=for_every_hotel]").change();
    $("input[name=for_every_airline]").change();
  });

  $("#editModalForm").submit(function (e) {
    const form = $(this);

    e.preventDefault();

    $.ajax({
      type: "POST",
      url: "/admin/coupon/edit/" + encodeURIComponent(form.data("coupon-code")),
      data: form.serialize()
    }).done(() => {
      alert("Success!");
      location.reload();
    });
  });

  $("#deleteModalForm").submit(function (e) {
    e.preventDefault();

    $.ajax({
      type: "DELETE",
      url: "/admin/coupon/delete/" + encodeURIComponent($(this).data("coupon-code"))
    }).done(() => {
      alert("Success!");
      location.reload();
    });
  });
});
