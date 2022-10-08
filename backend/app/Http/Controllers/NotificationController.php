<?php

namespace App\Http\Controllers;

use App\Models\GroupClass;
use App\Models\Notification;
use Exception;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
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
                    array_push($members, $class->teacher);
                }

                array_push($members, ...$class->students()->where('users.id','!=',$user->id)->get());

                return $members;
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
