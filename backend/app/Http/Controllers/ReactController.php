<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Exception;
use Illuminate\Http\Request;

class ReactController extends Controller
{
    //
    public function likePost ($postId, Request $request) {
        try {
            $user = $request->user();
            $post = Post::find($request->postId);
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
}
