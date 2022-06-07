<?php

namespace App\Models;

use Arr;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
	const CUSTOMER = 'customer';
	const DEAD = 'dead';
	const TRIAL = 'trial';

	const STATUS = [self::CUSTOMER, self::DEAD, self::TRIAL];

    protected $fillable = [
        'name',
        'status',
        'address',
        'started_at'
    ];

    protected $casts = [
        'started_at'  => 'datetime'
    ];

    /**
     * Scope a query to search the company by status
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $status
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeStatusSearch($query, $status)
    {
        return $query->whereIn('status', Arr::wrap($status));
    }
}
