<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;
    protected $fillable = [
        'homework_id',
        'number',
        'answer',
        'point'
    ];

    public function homework() {
        return $this->belongsTo(Homework::class, 'homework_id', 'id');
    }
}
