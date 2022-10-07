<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Comment extends Pivot
{
    use HasFactory;
    
    public $incrementing = true;

    protected $fillable = [
        'user_id',
        'post_id',
        'content',
        'parent_id'
    ];
}
