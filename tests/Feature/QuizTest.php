<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class QuizTest extends TestCase
{
    
    public function testsQuiz()
    {
         
        $this->json('GET', '/api/questions', [], [])->assertStatus(200);
    }

    
    public function testsQuizResponse()
    {
        
        $this->json('GET', '/api/questions', [], [])
            ->assertStatus(200)
            ->assertJsonStructure([
                'questions' => [
                    ['id', 'question', 'answer', 'created_at', 'updated_at']
                ],
            ]);
    }
}
