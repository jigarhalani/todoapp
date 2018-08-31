<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Task extends Model implements Auditable
{
	use \OwenIt\Auditing\Auditable;

	protected $fillable = [
        'title', 'todo_list_id', 'completed_at'
    ];
    
    public function todoList()
    {
        return $this->belongsTo(TodoList::class);
    }
}
