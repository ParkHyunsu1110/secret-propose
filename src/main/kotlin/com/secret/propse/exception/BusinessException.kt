package com.secret.propse.exception

import com.secret.propse.common.ResultCode

open class BusinessException(
	val resultCode: ResultCode,
	override val message: String = resultCode.description
) : RuntimeException(message)
