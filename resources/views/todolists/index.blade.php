@extends('layouts.tasklayout')

@section('title', 'Todo List')
    
@section('content')
  <header>
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <div class="clearfix">
            <div class="pull-left"><h1 class="header-title">Todo List</h1></div>
            <div class="pull-right">
              <a href="{{ route('todolists.create') }}" class="btn btn-success show-todolist-modal" title="Create New List">Create New List</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="alert alert-warning {{ $count ? 'hidden' : '' }}" id="no-record-alert">
          No record found.
        </div>
        <div class="alert alert-success" id="update-alert" style="display:none;"></div>
        <div class="modal fade" tabindex="-1" role="dialog" id="todolist-modal">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="todo-list-title">Create New List</h4>
              </div>
              <div class="modal-body" id="todo-list-body">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" id="todo-list-save-btn">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" tabindex="-1" role="dialog" id="task-modal">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Manage tasks</h4>
                <p>of <strong id="task-modal-subtitle"></strong></p>
              </div>
              <div class="modal-body">
                <div class="panel panel-default">
                  <table class="table">
                    <thread>
                      <td width="50" style="vertical-align: middle;">
                        <input type="checkbox" name="check-all" id="check-all">
                      </td>
                      <td>
                        <form action="" id="task-form">
                          {{ csrf_field() }}
                          <input type="hidden" id="selected-todo-list">
                          <input type="text" name="title" id="task-title" placeholder="Enter New Task" class="task-input">
                        </form>
                      </td>
                    </thread>
                    <tbody id="task-table-body">
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="modal-footer">
                  All Task
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" tabindex="-1" role="dialog" id="confirm-modal">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="confirm-title">Confirm deletion</h4>
              </div>
              <div class="modal-body" id="confirm-body">
                <form action="" method="POST">
                  {{ csrf_field() }}
                </form>
                <p></p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-danger" id="confirm-remove-btn">Yes</button>
              </div>
            </div>
          </div>
        </div>
        <div class="panel panel-default {{ ! $count ? 'hidden' : '' }}">
              <ul class="list-group" id="todo-list">
                @foreach($todoLists as $todoList)
                      @include('todolists.item', compact('todoList'))
                @endforeach
              </ul>
          <div class="panel-footer">
              Tasks
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection