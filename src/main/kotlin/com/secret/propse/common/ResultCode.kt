package com.secret.propse.common

enum class ResultCode(
	val code: String,
	val description: String
) {
	SUCCESS("0000", "정상 처리"),
	BAD_REQUEST("400", "잘못된 요청"),
	NOT_FOUND("404", "리소스를 찾을 수 없음"),
	INTERNAL_ERROR("500", "서버 내부 오류")
}
