<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Post;
use App\Models\Tag;
use Exception;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function getAllPosts(Request $request) {
        try {
            $posts = Post::with('user', 'hasTags', 'images')->where('type', $request->type)->orderBy('id', 'DESC')->paginate(10);
            $user = $request->user();

            foreach($posts as $post) {
                $post->like = $post->likes()->count();
                $post->commentCount = $post->comments()->count();
                $post->isLike = $post->likes()->where('user_id', $user->id)->exists();
                $post->isBookmarked = $post->usersBookmarking()->where('user_id', $user->id)->exists();
            }

            return response()->json([
                'statusCode' => 0,
                'data' => $posts,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'statusCode' => -1,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function getPostById($id, Request $request) {
        try {
            $post = Post::find($id);
            $user = $request->user();

            $post->user;
            $post->hasTags;
            $post->images;
            $post->like = $post->likes()->count();
            $post->commentCount = $post->comments()->count();
            $post->isLike = $post->likes()->where('user_id', $user->id)->exists();
            $post->isBookmarked = $post->usersBookmarking()->where('user_id', $user->id)->exists();

            if (!$post) {
                return response()->json([
                    'statusCode' => 1,
                    'status' => 401,
                    'message' => 'Post is not exist!'
                ]);
            }

            return response()->json([
                'statusCode' => 0,
                'data' => $post,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'statusCode' => -1,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function getPostsByTag(Request $request)
    {
        try {
            $posts = Tag::find($request->tag_id)->posts()->where('type', $request->type)->orderBy('like_count', 'DESC')->get();
            $user = $request->user();

            foreach ($posts as $post) {
                $post->hasTags;
                $post->images;
                $post->like = $post->likes()->count();
                $post->isLike = $post->likes()->where('user_id', $user->id)->exists();
                $post->commentCount = $post->comments()->count();
                $post->isBookmarked = $post->usersBookmarking()->where('user_id', $user->id)->exists();
            }

            return response()->json([
                'statusCode' => 0,
                'data' => $posts,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'statusCode' => -1,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function create(Request $request)
    {
        try {
            $fields = $request->validate(
                [
                    'user_id' => 'required|integer',
                    'content' => 'required|string',
                    'type' => 'required|integer',
                    'class_id' => 'required|integer',
                ]
            );

            $newPost = Post::create([
                'user_id' => $fields['user_id'],
                'content' => $fields['content'],
                'type' => $fields['type'],
                'class_id' => $fields['class_id'],
                'completed' => $request->completed,
            ]);

            if ($request->tag_ids) {
                $newPost->hasTags()->attach($request->tag_ids);
                $newPost->save();
            }

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $imageName = time() . rand(1, 100) . '.' . $image->getClientOriginalExtension();

                    $image->move(public_path('images/'), $imageName);

                    $imagePath = asset('images/') . '/' . $imageName;

                    Image::create([
                        'post_id' => $newPost->id,
                        'link' => $imagePath,
                    ]);
                }
            }

            $newPost->hasTags;
            $newPost->images;

            return response()->json([
                'statusCode' => 0,
                'data' => $newPost,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'statusCode' => -1,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function deletePostById($id)
    {
        try {
            $post = Post::find($id);

            $post->delete();

            return response()->json([
                'statusCode' => 0,
                'message' => 'delete post successfully',
            ]);
        } catch (Exception $e) {
            return response()->json([
                'statusCode' => -1,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function setCompleted($id) {
        $question = Post::find($id);
        $question->completed = 1-$question->completed;
        $question->save();
        return response()->json([
            'statusCode' => 0,
            'data' => $question,
            'messsage' => 'completed'
        ]);
    }

    public function searchPosts(Request $request) {
        try {
            $posts = []; 
            $user = $request->user();
            if($request->tagId) {
                $tags = $request->tagId;
                $posts = Post::whereHas('hasTags', function($q) use($tags) { 
                    $q->whereIn('tags.id', $tags);
                })->where('type', $request->type)->with('user', 'hasTags', 'images')->orderBy('like_count', 'DESC')->paginate(10);
            } else {
                $posts = Post::where('content', 'like', '%'.$request->searchValue.'%')->where('type', $request->type)
                ->with('user', 'hasTags', 'images')
                ->orderBy('like_count', 'DESC')->paginate(10);
            }
            foreach($posts as $post) {
                $post->like = $post->likes()->count();
                $post->commentCount = $post->comments()->count();
                $post->isLike = $post->likes()->where('user_id', $user->id)->exists();
                $post->isBookmarked = $post->usersBookmarking()->where('user_id', $user->id)->exists();
            }
            return response()->json([
                'statusCode' => 0,
                'data' => $posts,
                'message' => 'success'
            ]);
        } catch (Exception $err) {
            return response()->json([
                'statusCode' => -1,
                'message' => $err->getMessage()
            ]);
        }
    }

    public function relatedPost(Request $request) {
        $tags = $request->tagId;
        $posts = Post::whereHas('hasTags', function($q) use($tags) { 
            $q->whereIn('tags.id', $tags);
        })->where('type', $request->type)->with('user', 'hasTags')->orderBy('like_count', 'DESC')->limit(10)->paginate(5);
        return response()->json([
            'statusCode' => 0,
            'data' => $posts,
            'messsage' => 'sucess',
        ]);
    }

    public function bookmark(Request $request) {
        $user = $request->user();
        $user->bookmark()->toggle($request->postId);
        return response()->json([
            'statusCode' => 0,
            'message' => 'bookmark toggled'
        ]);
    } 
}
