<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupClass extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'teacher_id',
    ];

    public function teacher() {
        return $this->belongsTo(User::class, 'teacher_id', 'id');
    }

    public function homeworks() {
        return $this->hasMany(Homework::class, 'class_id', 'id');
    }

    public function students() {
        return $this->belongsToMany(User::class, 'class_student', 'class_id', 'student_id')->withTimestamps();
    }
    
}
