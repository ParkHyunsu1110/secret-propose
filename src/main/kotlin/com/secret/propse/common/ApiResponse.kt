package com.secret.propse.common

data class ApiResponse<T>(
	val code: String,
	val message: String,
	val data: T?
) {
	companion object {
		fun <T> success(data: T?): ApiResponse<T> =
			ApiResponse(ResultCode.SUCCESS.code, ResultCode.SUCCESS.description, data)

		fun <T> successList(data: List<T>): ApiResponse<List<T>> =
			ApiResponse(ResultCode.SUCCESS.code, ResultCode.SUCCESS.description, data)
	}
}
