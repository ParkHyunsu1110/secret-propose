package com.secret.propse.controller

import com.secret.propse.common.ApiResponse
import com.secret.propse.common.BaseController
import com.secret.propse.dto.VisitRequestDto
import com.secret.propse.service.VisitService
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/visit")
class VisitController(
    private val visitService: VisitService,
) : BaseController() {

    @PostMapping
    fun registerVisit(
        @RequestBody dto: VisitRequestDto,
        request: HttpServletRequest,
    ): ResponseEntity<ApiResponse<Nothing>> {
        visitService.registerVisit(dto.page, request.getHeader("User-Agent") ?: "")
        return success(null)
    }
}
