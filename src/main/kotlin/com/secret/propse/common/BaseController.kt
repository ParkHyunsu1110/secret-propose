package com.secret.propse.common

import org.springframework.http.ResponseEntity

abstract class BaseController {

	protected fun <T> success(data: T?): ResponseEntity<ApiResponse<T>> =
		ResponseEntity.ok(ApiResponse.success(data))

	protected fun <T> successList(data: List<T>): ResponseEntity<ApiResponse<List<T>>> =
		ResponseEntity.ok(ApiResponse.successList(data))
}
