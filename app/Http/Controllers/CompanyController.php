<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use App\Http\Requests\CompanyRequest;
use App\Http\Resources\CompanyResource;
use Symfony\Component\HttpFoundation\Response;

class CompanyController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $companies = Company::when($request->has('status'), function ($query) use ($request) {
            $query->statusSearch($request->status ?? Company::STATUS);
        })->when($request->has('sort_column'), function ($query) use ($request) {
            $query->orderBy($request->sort_column, $request->sort_order ?? 'ASC');
        })->paginate($request->records_per_page ?? config('services.default_pagination'));

        return $this->response(
            ['company' => CompanyResource::collection($companies)],
            'Success',
            Response::HTTP_OK,
            $companies
        );
    }

    /**
     * @param Company $company
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Company $company)
    {
        return $this->response(
            ['company' => new CompanyResource($company)],
            'Success',
            Response::HTTP_OK
        );
    }

    /**
     * @param CompanyRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CompanyRequest $request)
    {
        $company = Company::create([
            'name'          => $request->get('name'),
            'address'       => $request->get('address'),
            'status'        => $request->get('status'),
            'started_at'    => $request->get('started_at')
        ]);

        return $this->response(
            ['company' => new CompanyResource($company)],
            'Success',
            Response::HTTP_CREATED
        );
    }

    /**
     * @param CompanyRequest $request
     * @param Company $company
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(CompanyRequest $request, Company $company)
    {
        $company->update([
            'name'          => $request->get('name'),
            'address'       => $request->get('address'),
            'status'        => $request->get('status'),
            'started_at'    => $request->get('started_at')
        ]);

        return $this->response(
            ['company' => new CompanyResource($company->refresh())], 
            'Success', 
            Response::HTTP_OK
        );
    }
}