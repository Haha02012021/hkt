<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Homework extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'file_link',
        'class_id',
        'teacher_id',
        'class_id',
        'total_point'
    ];

    public function teacher() {
        return $this->belongsTo(User::class, 'teacher_id', 'id');
    }

    public function exercises() {
        return $this->hasMany(Exercise::class, 'homework_id', 'id');
    }

    public function groupclass() {
        return $this->belongsTo(GroupClass::class, 'class_id', 'id');
    }

    public function students() {
        return $this->belongsToMany(User::class, 'student_answer', 'homework_id', 'user_id')->using(StudentAnswers::class)->withPivot('id', 'exercise_number', 'answer', 'point')->withTimestamps();
    }
}
