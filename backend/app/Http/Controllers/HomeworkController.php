<?php

namespace App\Http\Controllers;

use App\Models\GroupClass;
use App\Models\Homework;
use App\Models\StudentAnswers;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class HomeworkController extends Controller
{
    //
    public function asign(Request $request) {
        try {
            $homework = new Homework();
            if ($request->hasFile('homework')) {
                $file = $request->file('homework');
                $filename = time().rand(1,10).$file->getClientOriginalName();
                $file->move(public_path('homeworks/'), $filename);

                $path = asset('homeworks/') . '/' . $filename;
                $homework->file_link = $path;
            }
            if ($request->hasFile('listening')) {
                $file = $request->file('listening');
                $filename = time().rand(1,10).$file->getClientOriginalName();
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

    function submitHandle(Request $request) {
        $user = $request->user();
        $path = null;
        if ($request->hasFile('answer_file')) {
            $file = $request->file('answer_file');
            $filename = time().rand(1,10).$file->getClientOriginalName();
            $file->move(public_path('answer/'), $filename);

            $path = asset('answer/') . '/' . $filename;
        }
        $homework = StudentAnswers::where('homework_id', $request->homework_id)->where('student_id', $user->id)->first();
        if(!$homework) {
            $user->doHomework()->attach($request->homework_id, ['answer_file' => $path, 'status' => 1]);
            return response()->json([
                'statusCode' => 0,
                'data' => $path,
                'messsage' => 'submited'
            ]);
        }
        else {
            //dd(File::delete(public_path('answer/'.$request->file_name)));
            $homework->status = $homework->status * -1;
            if($path) {
                $homework->answer_file = $path;
            } else {
                if (File::exists(public_path('answer/'.$request->file_name))) {
                    File::delete(public_path('answer/'.$request->file_name));
                }
                $homework->answer_file = $path;
            }
            $homework->save();
            return response()->json([
                'statusCode' => 0,
                'data' => $homework,
                'messsage' => 'submited'
            ]);
        }
    }

    public function check(Request $request) {
        $answer = StudentAnswers::find($request->answer_id);
        $answer->comment = $request->comment;
        $answer->status = 0;
        $answer->save();
        return response()->json([
            'statusCode' => 0,
            'data' => $answer,
            'message' => 'teacher checked'
        ]);
    }
}
