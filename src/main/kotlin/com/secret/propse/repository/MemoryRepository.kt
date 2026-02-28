package com.secret.propse.repository

import com.secret.propse.entity.Memory
import org.springframework.data.jpa.repository.JpaRepository

interface MemoryRepository : JpaRepository<Memory, Long> {
    fun findAllByOrderBySortOrderAsc(): List<Memory>
}
