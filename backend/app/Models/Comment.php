<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Comment extends Pivot
{
    use HasFactory;
    
    public $incrementing = true;

    protected static function boot() {
        parent::boot();

        static::deleting(function ($comment) {
            foreach($comment->childs as $child) {
                $child->delete();
            }
        });
    }

    protected $fillable = [
        'user_id',
        'post_id',
        'content',
        'parent_id',
        'like_count',
    ];

    public function childs()
    {
        return $this->hasMany(Comment::class, 'parent_id', 'id');
    }   

    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id', 'id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
     }

    public function allChilds()
    {
        return $this->childs()->with('allChilds', 'user');
    }

    public function agreedBy() {
        return $this->belongsToMany(User::class, 'agree', 'comment_id', 'user_id')->withTimestamps();
    }

}
