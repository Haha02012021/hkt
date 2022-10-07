<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class StudentAnswers extends Pivot
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'homework_id',
        'exercise_number',
        'answer',
        'point',
    ];
}
