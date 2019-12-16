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

  function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  function randomCouponCode() {
    return randomString(10, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  }

  $("select[multiple='multiple'].hotel-select").select2({
    width: '100%',
    ajax: searchOptionsSelectAjax("hotel")
  });

  $("select[multiple='multiple'].airline-select").select2({
    width: '100%',
    ajax: searchOptionsSelectAjax("airline")
  });

  $("select[multiple='multiple'].user-select").select2({
    width: '100%',
    ajax: searchOptionsSelectAjax("user")
  });

  $("input[name=for_every_airline]").change(function (e) {
    $(e.target.form).find(".airline-select").next(".select2-container").toggle(!this.checked);
  });

  $("input[name=for_every_hotel]").change(function (e) {
    $(e.target.form).find(".hotel-select").next(".select2-container").toggle(!this.checked);
  });

  $("input[name=unlimited]").change(function (e) {
    const div = $(e.target.form).find("div[id$=MaxRedeemCount]");
    div.toggle(!this.checked);
    div.find("input[name=max_count]").prop("required", !this.checked);
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
    $("input[name=unlimited]").change();
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
    const node = $("p[data-coupon]").filter((i, e) => $(e).data("coupon-code") == code);
    const coupon = node.data("coupon");
    const modal = $(this);
    const form = modal.find("form");
    const find = name => form.find("input[name=" + name + "]");

    form.data("coupon-code", code);

    for (const key of ['code', 'name', 'discount_percentage', 'max_count']) {
      find(key).val(coupon[key]);
    }

    find("start_date").get(0).valueAsDate = new Date(coupon["start_date"]);
    find("expire_date").get(0).valueAsDate = new Date(coupon["expire_date"]);
    find("for_every_hotel").prop("checked", coupon.for_every_hotel);
    find("for_every_airline").prop("checked", coupon.for_every_airline);
    find("unlimited").prop("checked", coupon['max_count'] == null);
    form.find("textarea[name=description]").val(coupon["description"]);
    form.find('select[name="levels"]').val(coupon.levels).change();

    const hotelsSelect = form.find('select[name="hotels"]');
    const airlinesSelect = form.find('select[name="airlines"]');
    const usersSelect = form.find('select[name="users"]');

    hotelsSelect.val(null);
    airlinesSelect.val(null);
    usersSelect.val(null);

    $.map(coupon.hotels, function (e) {
      hotelsSelect.append(new Option(e.name, e.id, false, true));
    });

    $.map(coupon.airlines, function (e) {
      airlinesSelect.append(new Option(e.name, e.id, false, true));
    });

    $.map(coupon.users, function (e) {
      usersSelect.append(new Option(e.name, e.id, false, true));
    });

    hotelsSelect.change();
    airlinesSelect.change();
    usersSelect.change();

    $("input[name=for_every_hotel]").change();
    $("input[name=for_every_airline]").change();
    $("input[name=unlimited]").change();
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

  $("button[name=couponGenerateButton]").click(function (e) {
    $(e.target.form).find("input[name=code]").val(randomCouponCode());
  });
});
