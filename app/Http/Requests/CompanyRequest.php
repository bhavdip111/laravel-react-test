<?php

namespace App\Http\Requests;

use App\Models\Company;
use App\Http\Requests\CoreRequest;

class CompanyRequest extends CoreRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'  => [
                'required', 
                'string', 
                'min:2', 
                'max:255'
            ],
            'status' => [
                'required',
                'in:' . implode(',', Company::STATUS)
            ],
            'address' => [
                'required', 
                'string', 
                'min:2', 
                'max:1024'
            ],
            'started_at' => [
                'required', 
                'date', 'date_format:Y-m-d H:i:s'
            ]
        ];
    }
}
