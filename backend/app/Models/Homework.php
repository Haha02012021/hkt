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
        'teacher_id',
        'class_id',
        'deadline',
        'listen_file',
        'description',
    ];

    public function teacher() {
        return $this->belongsTo(User::class, 'teacher_id', 'id');
    }

    public function groupclass() {
        return $this->belongsTo(GroupClass::class, 'class_id', 'id');
    }

    public function students() {
        return $this->belongsToMany(User::class, 'student_answer', 'homework_id', 'student_id')->using(StudentAnswers::class)
        ->withPivot('id', 'answer_file','status','comment')->withTimestamps();
    }
}
