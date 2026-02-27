package com.secret.propse.exception

import com.secret.propse.common.ApiResponse
import com.secret.propse.common.ResultCode
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalExceptionHandler {

	@ExceptionHandler(BusinessException::class)
	fun handleBusinessException(ex: BusinessException): ResponseEntity<ApiResponse<Nothing>> {
		val response = ApiResponse(ex.resultCode.code, ex.message, null)
		val status = when (ex.resultCode) {
			ResultCode.BAD_REQUEST -> HttpStatus.BAD_REQUEST
			ResultCode.NOT_FOUND -> HttpStatus.NOT_FOUND
			else -> HttpStatus.BAD_REQUEST
		}
		return ResponseEntity.status(status).body(response)
	}

	@ExceptionHandler(Exception::class)
	fun handleException(ex: Exception): ResponseEntity<ApiResponse<Nothing>> {
		val response = ApiResponse(
			ResultCode.INTERNAL_ERROR.code,
			ResultCode.INTERNAL_ERROR.description,
			null
		)
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response)
	}
}
