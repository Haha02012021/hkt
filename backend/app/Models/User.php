<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'school',
        'level_id',
        'role',
        'avatar',
        'class_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function posts() {
        return $this->hasMany(Post::class, 'user_id', 'id');
    }

    public function comments() {
        return $this->belongsToMany(Post::class, 'comment', 'user_id', 'post_id')->using(Comment::class)->withPivot('id', 'content', 'parent_id')->withTimestamps();
    }

    public function homeworks() {
        return $this->hasMany(Homework::class, 'teacher_id', 'id');
    }

    public function classes() {
        return $this->hasMany(GroupClass::class, 'class_id', 'id');
    }

    public function likes() {
        return $this->belongsToMany(Post::class, 'like', 'user_id', 'post_id');
    }

    public function doHomework() {
        return $this->belongsToMany(Homework::class, 'student_answer', 'user_id', 'homework_id')->using(StudentAnswers::class)->withPivot('id', 'exercise_number', 'answer')->withTimestamps();
    }
}
