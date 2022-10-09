<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Exception;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    //
    public function addComment(Request $request) {
        try {
            $comment = new Comment();
            $comment->user_id = $request->user_id;
            $comment->post_id = $request->post_id;
            $comment->content = $request->content;
            $comment->parent_id = $request->parent_id;
            $comment->save();
            
            $comment->user;

            return response()->json([
                'statusCode' => 0,
                'data' => $comment,
                'message' => 'new comment created'
            ]);
        } catch (Exception $err) {
            return response()->json([
                'statusCode' => -1,
                'message' => $err->getMessage(),
            ]);
        }
    }

    public function editComment(Request $request) {
        try {
            $comment = Comment::find($request->id);
            if(!$comment) {
                return response()->json([
                    'statusCode' => 1,
                    'message' => 'not found'
                ]);
            }

            $comment->update([
                'content' => $request->content
            ]);

            return response()->json([
                'statusCode' => 0,
                'data' => $comment->cotent,
                'message' => 'comment edited'
            ]);
            
        } catch (Exception $err) {
            return response()->json([
                'statusCode' => -1,
                'message' => $err->getMessage(),
            ]);
        }    
    }

    public function commentsOfPost($postId, Request $request) {
        try {
            $comment = Comment::where('post_id', $postId)->where('parent_id', null)->with('allChilds', 'user')->orderBy('id', 'DESC')->get();
            $user = $request->user();
            $comment->isLike = $comment->agreedBy()->where('user_id', $user->id)->exists();
            if(!$comment) {
                return response()->json([
                    'statusCode' => 1,
                    'message' => 'post has no comments'
                ]);
            } else {
                return response()->json([
                    'statusCode' => 0,
                    'data' => $comment,
                    'message' => 'succeeded'
                ]);
            }
        } catch (Exception $err) {
            return response()->json([
                'statusCode' => -1,
                'message' => $err->getMessage(),
            ]);
        }
    }

    public function deleteComment($id) {
        try {
            $comment = Comment::find($id);
            if(!$comment) {
                return response()->json([
                    'statusCode' => 1,
                    'message' => 'post has no comments'
                ]);
            }
            $comment->delete();
            return response()->json([
                'statusCode' => 0,
                'message' => 'comment deleted'
            ]);
        } catch (Exception $err) {
            return response()->json([
                'statusCode' => -1,
                'message' => $err->getMessage(),
            ]);
        }
    }
}
