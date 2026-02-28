package com.secret.propse.controller

import com.secret.propse.common.ApiResponse
import com.secret.propse.common.BaseController
import com.secret.propse.dto.LetterDto
import com.secret.propse.service.LetterService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/letter")
class LetterController(
    private val letterService: LetterService,
) : BaseController() {

    @GetMapping
    fun fetchLetter(): ResponseEntity<ApiResponse<LetterDto>> =
        success(letterService.fetchLetter())
}
