<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
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

Route::middleware('auth:sanctum')->group(function() {
    Route::group(['prefix' => 'comments'], function() {
        Route::post('/add', [CommentController::class, 'addComment']);
        Route::put('/edit', [CommentController::class, 'editComment']);
        Route::get('/post/postId={postId}', [CommentController::class, 'commentsOfPost']);
        Route::delete('/delete/commentId={id}', [CommentController::class, 'deleteComment']);
    });

    Route::group(['prefix' => 'post'], function() {
        Route::get('/get-all', [PostController::class, 'getAllPosts']);
        Route::get('/get/{id}', [PostController::class, 'getPostById']);
        Route::get('/get-by-tag', [PostController::class, 'getPostsByTag']);
        Route::post('/create', [PostController::class, 'create']);
        Route::delete('/delete/{id}', [PostController::class, 'deletePostById']);
    });
    
    Route::group(['prefix' => 'class'], function() {
        Route::post('/create', [GroupClassController::class, 'create']);
    });
});

Route::group(['prefix' => 'auth'], function() {
    Route::post('/signup', [AuthController::class, 'signup']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
});

Route::get('link', function() {
    return URL::to('/images');
});