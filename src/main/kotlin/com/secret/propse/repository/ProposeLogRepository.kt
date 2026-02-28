package com.secret.propse.repository

import com.secret.propse.entity.ProposeLog
import org.springframework.data.jpa.repository.JpaRepository

interface ProposeLogRepository : JpaRepository<ProposeLog, Long> {
    fun findFirstByOrderByAcceptedAtAsc(): ProposeLog?
}
