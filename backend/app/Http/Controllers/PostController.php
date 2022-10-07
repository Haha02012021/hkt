<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Post;
use App\Models\Tag;
use Exception;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function getAllPosts()
    {
        try {
            $posts = Post::with('user', 'hasTags', 'images')->paginate(10);

            foreach ($posts as $post) {
                $post->like = count($post->likes);
                $post->commentCount = count($post->comments);
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

    public function getPostById($id)
    {
        try {
            $post = Post::find($id);

            $post->user;
            $post->hasTags;
            $post->images;
            $post->like = count($post->likes);
            $post->commentCount = count($post->comments);

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
            $posts = Tag::find($request->tag_id)->posts;

            foreach ($posts as $post) {
                $post->hasTags;
                $post->images;
                $post->like = count($post->likes);
                $post->commentCount = count($post->comments);
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
}
