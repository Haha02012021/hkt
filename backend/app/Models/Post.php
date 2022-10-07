<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'content',
        'type',
        'class_id'
    ];

    public function comments() {
        return $this->belongsToMany(User::class, 'comment', 'post_id', 'user_id')->using(Comment::class)->withPivot('id', 'content', 'parent_id')->withTimestamps();
    }

    public function likes() {
        return $this->belongsToMany(User::class, 'like', 'post_id', 'user_id');
    }

    public function hasTags() {
        return $this->belongsToMany(Tag::class, 'post_tag', 'post_id', 'tag_id')->withPivot('id', 'name')->withTimestamps();
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function images() {
        return $this->hasMany(Image::class, 'post_id', 'id');
    }

}
