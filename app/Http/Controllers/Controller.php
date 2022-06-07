<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Arr;
use ReflectionClass;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * @param mixed $data
     * @param string $message
     * @param int $status
     * @param LengthAwarePaginator|null $paginator
     * @return \Illuminate\Http\JsonResponse
     */
    protected function response($data, string $message, $status = 200, LengthAwarePaginator $paginator = null)
    {
        if (is_object($data) && method_exists($data, 'toArray')) {
            $class        = new ReflectionClass($data);
            $method       = $class->getMethod('toArray');
            $needsRequest = (Arr::first($method->getParameters())->name ?? null) === 'request';
            $data         = $data->toArray(...($needsRequest ? [request()] : []));
        }

        $response = [
            'status'  => ($status == 200 || $status == 201) ? 1 : 0,
            'message' => $message,
            'data'    => $data
        ];

        if ($paginator) {
            $response['pagination'] = [
                'total'            => $paginator->total(),
                'per_page'         => $paginator->perPage(),
                'page_number'      => $paginator->currentPage(),
                'last_page_number' => $paginator->lastPage()
            ];
        }

        return response()->json($response, $status);
    }

    /**
     * @param string $message
     * @param int $status
     * @return \Illuminate\Http\JsonResponse
     */
    protected function errorResponse(string $message, int $status)
    {
        return $this->response([], $message, $status);
    }

    /**
     * @param $validator
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    protected function failedValidation($validator, string $message = null)
    {
        return response()->json([
            'message' => ($message) ?? "The given data was invalid.",
            'status' => 0,
            'errors' => $validator->errors()
        ], 422);
    }
}
