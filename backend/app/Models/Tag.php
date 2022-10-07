<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;
    protected $fillable = [
        'name'
    ];

    public function posts() {
        return $this->hasMany(Post::class, 'tag_id', 'id');
    }

    public function hasTags() {
        return $this->belongsToMany(Post::class, 'post_tag', 'tag_id', 'post_id')->withPivot('id', 'name')->withTimestamps();
    }
}
