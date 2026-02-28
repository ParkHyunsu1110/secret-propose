package com.secret.propse.controller

import com.secret.propse.common.ApiResponse
import com.secret.propse.common.BaseController
import com.secret.propse.entity.Memory
import com.secret.propse.service.MemoryService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/memories")
class MemoryController(
    private val memoryService: MemoryService,
) : BaseController() {

    @GetMapping
    fun fetchAll(): ResponseEntity<ApiResponse<List<Memory>>> =
        successList(memoryService.fetchAll())
}
