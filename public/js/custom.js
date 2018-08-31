
$('body').on('click','.show-todolist-modal', function(event) {
    event.preventDefault();
    var me = $(this), url = me.attr('href'), title = me.attr('title');
    $('#todo-list-title').text(title);
    $('#todo-list-save-btn').text(me.hasClass('edit') ? 'Update' : 'Create');
    $.ajax({
      url: url,
      dataType: 'html',
      success: function(response){
        $('#todo-list-body').html(response);
      }
    });

  $('#todolist-modal').modal('show');
});

$('#todo-list-save-btn').click(function(event){
  event.preventDefault();
  var form = $('#todo-list-body form'),
      url = form.attr("action"),
      method = $('input[name=_method]').val() == undefined ? "POST" : 'PUT';
  
  form.find('.help-block').remove();
  form.find('.form-group').removeClass('has-error');

  $.ajax({
    url: url,
    method: method,
    data: form.serialize(),
    success: function(response){
      console.log(response);
      console.log(method);
      if (method == 'POST'){
        $('#todo-list').prepend(response);
          showMessage("Todo list has been Created.", "#update-alert")
        form.trigger('reset');
        $('#title').focus();
      }
      else {
        //this is the hidden input too
        var id = $('input[name=id]').val();
        if (id) {
          $('#todo-list-' + id).replaceWith(response);
        }
        showMessage("Todo list has been updated.", "#update-alert")
      }
      $('#todolist-modal').modal('hide');


    },
    error: function (xhr) {
      console.log("eerrrr");
        console.log(xhr);
      var errors = xhr.responseJSON.errors;
      if($.isEmptyObject(errors) == false) {
        $.each(errors, function(key,value){
          $('#' + key)
              .closest('.form-group')
              .addClass('has-error')
              .append('<span class="help-block"><strong>' + value + '</strong></span>')
        });
      }
    }
  });
});


$('body').on('click', '.show-confirm-modal', function(event) {
    event.preventDefault();
    var me = $(this),
        title = me.attr('data-title'),
        action = me.attr('href');
    $('#confirm-body form').attr('action', action);
    $('#confirm-body p').html("Do you want to delete the list: <strong>" + title + "</strong>?" );
    $('#confirm-modal').modal('show');
});


$('body').on('click', '#confirm-remove-btn', function(e){
      e.preventDefault();
      var form = $('#confirm-body form'),
          url = form.attr('action');
      $.ajax({
        url: url,
        method: 'DELETE',
        data: form.serialize(),
        success: function(data) {
          $('#confirm-modal').modal('hide');

          $('#todo-list-' + data.id).fadeOut(function() {
             $(this).remove();
             showMessage("Todo list has been deleted.", "#update-alert")
          });
        }
       });
});


$('body').on('click', '.show-task-modal', function(event) {
      event.preventDefault();
      var me = $(this),
        url = me.attr('href'),
        title = me.data('title'),
        action = me.data('action'),
        parent = me.closest('.list-group-item');
      $("#task-modal-subtitle").text(title);
      $('#task-form').attr('action',action);
      $('#selected-todo-list').val(parent.attr('id'));
      $.ajax({
        url: url,
        dataType: 'html',
        success: function (response) {
          $('#task-table-body').html(response);
          initIcheck(); // to initialize icheck checkboxes
        }
      });
      $('#task-modal').modal('show');
});


$("#task-form").submit(function(e) {
      e.preventDefault();
      var form = $(this),
          url = form.attr('action');
      $.ajax({
        url: url,
        type: 'POST',
        data: form.serialize(),
        success: function (response) {
          $('#task-table-body').prepend(response);
          form.trigger('reset');
          initIcheck();
        }
      });
});

$('#task-table-body').on('click', '.remove-task-btn', function(e) {
      e.preventDefault();
      var url = $(this).attr('href');
      $.ajax({
        url: url,
        type: 'DELETE',
        data: {
          _token: $('input[name=_token]').val()
        },
        success: function(response) {
          $('#task-' + response.id).fadeOut(function() {
            $(this).remove();

          });
        }
      });
});

$(".filter-btn").click(function (e) {
  e.preventDefault();
  $(this).addClass('active').parent().children().not(e.target).removeClass('active');
  var id = this.id;
  if (id== "all-tasks"){
    $('tr.task-item').show();
  }
  else if (id== "active-tasks"){
    $('tr.task-item:not(:has(td.done))').show();
    $('tr.task-item:has(td.done)').hide();
  }
  else if (id== "completed-tasks"){
    $('tr.task-item:has(td.done)').show();
    $('tr.task-item:not(:has(td.done))').hide();
  }
});

function showMessage(message, element = "#add-new-alert") {
  $(element).text(message).fadeTo(1000,500).slideUp(2000, function () {
        $(this).hide();
  });
}

function markTheTask(checkbox) {
  url = checkbox.data('url'),
        completed = checkbox.is(':checked');

  $.ajax({
    url: url,
    type: 'PUT',
    data: {
      completed: completed,
      _token: $("input[name=_token]").val()
    },
    success: function(response) {
      if (response) {
        var nextId = checkbox.closest('td').next();

        if (completed) {
          nextId.addClass('done');
        }
        else {
          nextId.removeClass('done');
        }
      }
    }
  });
}

function initIcheck() {
  $('input[type=checkbox]').iCheck({
    checkboxClass: 'icheckbox_square-green',
    increaseArea: '20%'
  });

  $('#check-all').on('ifChecked', function(e){
    $('.check-item').iCheck('check');
  });
  
  $('#check-all').on('ifUnchecked', function(e){
    $('.check-item').iCheck('uncheck');
  });

  $('.check-item')
    .on('ifChecked', function(e){
      var checkbox = $(this);
      markTheTask(checkbox);
    })
    .on('ifUnchecked', function(e){
      var checkbox = $(this);
      markTheTask(checkbox);     
    });
  
}


$('#todolist-modal').on('keypress', 'input:not(textarea)', function (event){
  return event.keyCode != 13;
});
