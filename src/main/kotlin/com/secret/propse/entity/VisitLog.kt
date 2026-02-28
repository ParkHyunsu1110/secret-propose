package com.secret.propse.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "visit_log")
class VisitLog(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val page: String = "",
    val visitedAt: LocalDateTime = LocalDateTime.now(),

    @Column(length = 500)
    val userAgent: String = "",
)
