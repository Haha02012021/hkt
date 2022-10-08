<?php

namespace App\Http\Controllers;

use App\Models\GroupClass;
use App\Models\Notification;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function getNotificationsByUserId($id) {
        try {
            $notifications = User::find($id)->notifications;

            return response()->json([
                'statusCode' => 0,
                'data' => $notifications,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'statusCode' => -1,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function create(Request $request) {
        try {
            $user = $request->user();
            $newNoti = Notification::create([
                'user_id' => $user->id,
                'content' => $request->content,
                'link' => $request->link,
                'type' => $request->type,
            ]);

            if ($request->type === 0) {
                $class = GroupClass::find($request->class_id);
                $members = [];

                if ($user->role !== 1) {
                    array_push($members, $class->teacher->id);
                }

                array_push($members, ...$class->students()->where('users.id', '!=', $user->id)->pluck('users.id'));

                $newNoti->receivers()->attach($members);

            } else if ($request->type === 1) {
                $newNoti->receivers()->attach([$request->receiver_id]);
            }

            return response()->json([
                'statusCode' => 0,
                'data' => $newNoti,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'statusCode' => -1,
                'message' => $e->getMessage(),
            ]);
        }
    }
}
