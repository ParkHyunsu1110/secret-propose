package com.secret.propse.controller

import com.secret.propse.common.ApiResponse
import com.secret.propse.common.BaseController
import com.secret.propse.dto.ProposeStatusDto
import com.secret.propse.service.ProposeService
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/propose")
class ProposeController(
    private val proposeService: ProposeService,
) : BaseController() {

    @PostMapping("/accept")
    fun accept(request: HttpServletRequest): ResponseEntity<ApiResponse<Nothing>> {
        proposeService.accept(request.getHeader("User-Agent") ?: "")
        return success(null)
    }

    @GetMapping("/status")
    fun fetchStatus(): ResponseEntity<ApiResponse<ProposeStatusDto>> =
        success(proposeService.fetchStatus())
}
