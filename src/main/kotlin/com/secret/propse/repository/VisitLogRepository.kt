package com.secret.propse.repository

import com.secret.propse.entity.VisitLog
import org.springframework.data.jpa.repository.JpaRepository

interface VisitLogRepository : JpaRepository<VisitLog, Long>
