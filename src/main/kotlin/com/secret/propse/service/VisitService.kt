package com.secret.propse.service

import com.secret.propse.entity.VisitLog
import com.secret.propse.repository.VisitLogRepository
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class VisitService(
    private val visitLogRepository: VisitLogRepository,
) {

    fun registerVisit(page: String, userAgent: String) {
        visitLogRepository.save(
            VisitLog(
                page = page,
                visitedAt = LocalDateTime.now(),
                userAgent = userAgent,
            )
        )
    }
}
