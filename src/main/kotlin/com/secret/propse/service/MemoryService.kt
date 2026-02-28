package com.secret.propse.service

import com.secret.propse.entity.Memory
import com.secret.propse.repository.MemoryRepository
import org.springframework.stereotype.Service

@Service
class MemoryService(
    private val memoryRepository: MemoryRepository,
) {

    fun fetchAll(): List<Memory> = memoryRepository.findAllByOrderBySortOrderAsc()
}
