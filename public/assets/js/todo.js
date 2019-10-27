$(document).ready(() => {
  $("#todoList").append(
    `<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`
  );

  $.ajax({
    url: "/api/todo",
    method: "GET"
  })
    .done((data, textStatus, jqXHR) => {
      $(".lds-spinner").remove();
      Swal.fire({
        title: "Download Successful!",
        text: "Fetch data completed",
        type: "success",
        confirmButtonText: "OK"
      });
      data.map(todo =>
        $("#todoList").append(
          `<li class="list-group-item">${todo.id} - ${todo.title}</li>`
        )
      );
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      $(".lds-spinner").remove();
      $("#todoList").innerHTML = "<p>Cannot fetch data from the server!</p>";
      Swal.fire({
        title: "Download Failed!",
        text: jqXHR,
        type: "error",
        confirmButtonText: "OK"
      });
    });

  $("#add-todo").submit(event => {
    event.preventDefault();
    $("#add-todo button").prop("disabled", true);

    $.ajax({
      url: "/api/todo",
      method: "POST",
      data: $("#add-todo").serialize()
    })
      .done((data, textStatus, jqXHR) => {
        $("#add-todo button").prop("disabled", false);
        if (data.status === 400) {
          Swal.fire({
            title: "Add todo failed!",
            text: data.status,
            type: "error",
            confirmButtonText: "OK"
          });
        } else {
          Swal.fire({
            title: "New todo added!",
            text: `ID: ${data}`,
            type: "success",
            confirmButtonText: "OK"
          });
          console.log(data);
        }
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        $("#add-todo button").prop("disabled", false);

        Swal.fire({
          title: "Add todo failed!",
          text: jqXHR,
          type: "error",
          confirmButtonText: "OK"
        });
      });
  });
});
