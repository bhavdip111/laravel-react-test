<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Arr;
use Throwable;

use Illuminate\Database\QueryException;
use Illuminate\Auth\AuthenticationException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Debug\Exception\FatalThrowableError;
use Symfony\Component\HttpKernel\Exception\BadMethodCallException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Throwable $exception)
    {
        if ($request->is('api/*')) {
            if ($exception instanceof HttpException) {
                return response()->json([
                    'status'    => 0,
                    'message'   => Response::$statusTexts[$exception->getStatusCode()],
                ], $exception->getStatusCode());
            } else if ($exception instanceof \BadMethodCallException) {
                return response()->json([
                    'status'    => 0,
                    'message'   => $exception->getMessage()
                ], 500);
            } else if ($exception instanceof QueryException) {
                $errorCode = $exception->errorInfo[1];
                // MYSQL Error Code: http://dev.mysql.com/doc/refman/5.7/en/error-messages-server.html#error_er_dup_entry
                switch ($errorCode) {
                    case 1062:
                        $message = "Similar resource already exists";
                        break;
                    case 1054:
                        $message = "Column not found";
                        break;
                    default:
                        $message = "Database query error";
                        break;
                }
                return response()->json([
                    'status'    => 0,
                    'message'   => $message
                ], 422);
            } else if ($exception instanceof UnauthorizedHttpException) {
                return response()->json([
                    'status'    => 105,
                    'message'   => $exception->getMessage()
                ], $exception->getStatusCode());
            } else if ($exception instanceof AuthenticationException) {
                return response()->json([
                    'status'    => 0,
                    'message'   => $exception->getMessage()
                ], 401);
            } else if ($exception instanceof ModelNotFoundException) {
                $modelNamespaceString = $exception->getModel();
                $modelString = Arr::last(explode('\\', $modelNamespaceString));
                return response()->json([
                    'status'    => 0,
                    'message'   => "$modelString entity not found!"
                ], 404);
            } else if ($exception instanceof FatalThrowableError) {
                return response()->json([
                    'status'    => 0,
                    'message'   => $exception->getMessage()
                ], 422);
            }
            return $this->prepareJsonResponse($request, $exception);
        }

        return parent::render($request, $exception);
    }
}
