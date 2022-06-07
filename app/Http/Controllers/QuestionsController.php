<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Result;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class QuestionsController extends Controller
{

    public function index()
    {
        $questions = Question::all();

        return response()->json([
            'questions' => $questions
        ], 200);
    }


    public function validateAttempt(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'attempt' => 'required|array',
            'attempt.*.question_id' => 'required|exists:questions,id',
            'attempt.*.answer' => 'required|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Bad request.',
                'errors' => $validator->errors()
            ], 400);
        }

        $score = 0;
        $response = [];

        foreach ($request->attempt as $key => $attempt) {
            $question = Question::where('id', $attempt['question_id'])->first();
            if ((bool) $question['answer'] == (bool) $attempt['answer']) {
                $score++;
            }
            $response[$key]['id'] = $question['id'];
            $response[$key]['your_answer'] =  (bool) $attempt['answer'];
            $response[$key]['correct_answer'] = (bool) $question['answer'];
        }

        Result::create([
            'score' => $score
        ]);

        return response()->json([
            'message' => 'Attempt success.',
            'score' => $score,
            'response' => $response
        ], 201);
    }
}
