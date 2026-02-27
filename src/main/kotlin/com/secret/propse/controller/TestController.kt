package com.secret.propse.controller

import com.secret.propse.common.ApiResponse
import com.secret.propse.common.BaseController
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class TestController : BaseController() {

	@GetMapping("/test")
	fun test(): ResponseEntity<ApiResponse<String>> = success("OK")
}
