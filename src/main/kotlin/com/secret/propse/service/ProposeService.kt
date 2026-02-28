package com.secret.propse.service

import com.secret.propse.dto.ProposeStatusDto
import com.secret.propse.entity.ProposeLog
import com.secret.propse.repository.ProposeLogRepository
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class ProposeService(
    private val proposeLogRepository: ProposeLogRepository,
) {

    fun accept(userAgent: String) {
        proposeLogRepository.save(
            ProposeLog(
                acceptedAt = LocalDateTime.now(),
                userAgent = userAgent,
            )
        )
    }

    fun fetchStatus(): ProposeStatusDto {
        val first = proposeLogRepository.findFirstByOrderByAcceptedAtAsc()
        return ProposeStatusDto(
            accepted = first != null,
            acceptedAt = first?.acceptedAt,
        )
    }
}
