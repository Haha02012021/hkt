<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Exception;
use Illuminate\Http\Request;

class ReactController extends Controller
{
    //
    public function likePost ($postId, Request $request) {
        try {
            $user = $request->user();
            $post = Post::find($postId);
            if(!$user) {
                return response()->json([
                    'statusCode' => 1,
                    'message' => 'user not found'
                ]);
            }
            $user->likes()->toggle($postId);
            if($request->value) {
                $post->like_count += $request->value;
                $post->save();
            }
            return response()->json([
                'statusCode' => 0,
                'data' => $post->like_count,
                'message' => 'reacted'
            ]);
        } catch (Exception $err) {
            return response()->json([
                'statusCode' => -1,
                'message' => $err->getMessage(),
            ]);
        }
    }

    public function likeComment ($commentId, Request $request) {
        try {
            $user = $request->user();
            $comment = Comment::find($request->commentId);
            if(!$user) {
                return response()->json([
                    'statusCode' => 1,
                    'message' => 'user not found'
                ]);
            }
            $user->agreed()->toggle($commentId);
            if($request->value) {
                $comment->like_count += $request->value;
                $comment->save();
            }
            return response()->json([
                'statusCode' => 0,
                'data' => $comment->like_count,
                'message' => 'reacted'
            ]);
        } catch (Exception $err) {
            return response()->json([
                'statusCode' => -1,
                'message' => $err->getMessage(),
            ]);
        }
    }
}
