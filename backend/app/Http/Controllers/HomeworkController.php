<?php

namespace App\Http\Controllers;

use App\Models\GroupClass;
use App\Models\Homework;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class HomeworkController extends Controller
{
    //
    public function asign(Request $request) {
        try {
            $homework = new Homework();
            if ($request->hasFile('homework')) {
                $file = $request->file('homework');
                $filename = time().rand(1,10).$request->file('homework')->getClientOriginalName();
                $file->move(public_path('homeworks/'), $filename);

                $path = asset('homeworks/') . '/' . $filename;
                $homework->file_link = $path;
            }
            if ($request->hasFile('listening')) {
                $file = $request->file('listening');
                $filename = time().rand(1,10).$request->file('listening')->getClientOriginalName();
                $file->move(public_path('listening/'), $filename);

                $path = asset('listening/') . '/' . $filename;
                $homework->listen_file = $path;
            }
            $homework->title = $request->title;
            $homework->class_id = $request->class_id;
            $homework->teacher_id = $request->teacher_id;
            $homework->description = $request->description;
            $homework->deadline = $request->deadline;
            $homework->save();

            $students = GroupClass::find($request->class_id)->students;

            $homework->students()->attach($students->pluck('id'));

            return response()->json([
                'statusCode' => 0,
                'data' => $homework,
                'message' => 'homework assigned',
            ]);

        } catch (Exception $err) {
            return response()->json([
                'statusCode' => -1,
                'message' => $err->getMessage(),
            ]);
        }
    }

    function submit(Request $request) {
        $user = $request->user();
        if ($request->hasFile('answer')) {
            $file = $request->file('answer');
            $filename = time().rand(1,10).$request->file('answer')->getClientOriginalName();
            $file->move(public_path('answer/'), $filename);

            $path = asset('answer/') . '/' . $filename;
        }
        $user->doHomework()->toggle($request->homework_id, ['answer_file' => $path]);
    }
}
