<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\TodoList;

class TodoListsController extends Controller
{


    public function __construct(){
    
        $this->middleware('auth');
    }

    public function index(Request $request)
    {

        $todoLists = $request->user()
                            ->todoLists()
                            ->with('tasks')
                            ->orderBy('updated_at', 'desc')
                            ->get();

        return view('todolists.index', compact('todoLists'), ['count' => $todoLists->count()]);
    }

    public function create()
    {
        $todoList = new TodoList();
        return view('todolists.form', compact('todoList'));
    }

    public function store(Request $request)
    {
        $this->validate($request,[
            'title' => 'required'
        ]);
        $todoList = $request->user()->todoLists()->create($request->all());
        return view('todolists.item', compact('todoList'));
    }

    public function show($id)
    {
        $todoList = TodoList::findOrFail($id);
        $tasks = $todoList
                ->tasks()
                ->latest()
                ->get();
        return view('tasks.index', compact('tasks'));
    }

    public function edit($id)
    {

        $todoList = TodoList::findOrFail($id);
        return view('todolists.form', compact('todoList'));
    }

    public function update(Request $request, $id)
    {
        $this->validate($request,[
            'title' => 'required',
        ]);

        $todoList = TodoList::findOrFail($id);
        $todoList->update($request->all()); // TO-UNDERSTAND update() method

        return view('todolists.item', compact('todoList'));
    }

    public function destroy($id)
    {
        $todoList = TodoList::findOrFail($id);
        $todoList->delete();

        return $todoList;
    }
}
