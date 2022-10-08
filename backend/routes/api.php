<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\GroupClassController;
use App\Http\Controllers\HomeworkController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ReactController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => 'comments'], function () {
        Route::post('/add', [CommentController::class, 'addComment']);
        Route::put('/edit', [CommentController::class, 'editComment']);
        Route::get('/post/{postId}', [CommentController::class, 'commentsOfPost']);
        Route::delete('/delete/{id}', [CommentController::class, 'deleteComment']);
    });
    Route::get('/user', function (Request $request) {
        return response()->json([
            'statusCode' => 0,
            'data' => $request->user(),
            'message' => 'authenticated'
        ]);
    });
    Route::post('/reaction/post/{postId}', [ReactController::class, 'likePost']);

    Route::group(['prefix' => 'post'], function () {
        Route::get('/get-all', [PostController::class, 'getAllPosts']);
        Route::get('/get/{id}', [PostController::class, 'getPostById']);
        Route::get('/get-by-tag', [PostController::class, 'getPostsByTag']);
        Route::post('/create', [PostController::class, 'create']);
        Route::delete('/delete/{id}', [PostController::class, 'deletePostById']);
        Route::post('/complete/{id}', [PostController::class, 'setCompleted']);
    });

    Route::group(['prefix' => 'class'], function () {
        Route::get('/get-all', [GroupClassController::class, 'getAllClasses']);
        Route::get('/get/{id}', [GroupClassController::class, 'getClassById']);
        Route::get('/get-by-user-id/{id}', [GroupClassController::class, 'getClassesByUserId']);
        Route::post('/create', [GroupClassController::class, 'create']);
        Route::put('/edit/{id}', [GroupClassController::class, 'edit']);
        Route::delete('/delete/{id}', [GroupClassController::class, 'deleteClassById']);
    });
    
    Route::group(['prefix' => 'homework'], function () {
        Route::post('/asign', [HomeworkController::class, 'asign']);
        Route::post('/submit', [HomeworkController::class, 'submitHandle']);
        Route::post('/check', [HomeworkController::class, 'check']);
        Route::get('/notCheck/{classId}', [HomeworkController::class, 'getAllNotCheck']);
        Route::get('/answers/{homeworkId}', [HomeworkController::class, 'getAllAnswers']);
        Route::get('/answers/{homeworkId}', [HomeworkController::class, 'getDetail']);
        Route::get('/homework-list/{classId}', [HomeworkController::class, 'getDetail']);
        Route::post('/check', [HomeworkController::class, 'check']);
    });
    
    Route::group(['prefix' => 'user'], function () {
        Route::get('/get-other-users', [UserController::class, 'getOtherUsers']);
    });

    Route::group(['prefix' => 'notification'], function () {
        Route::get('/get-by-user-id/{id}', [NotificationController::class, 'getNotificationsByUserId']);
        Route::post('/create', [NotificationController::class, 'create']);
    });

    Route::get('tag/get-all', [TagController::class, 'getAllTags']);
});

Route::group(['prefix' => 'auth'], function () {
    Route::post('/signup', [AuthController::class, 'signup']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
});
