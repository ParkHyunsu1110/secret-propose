package com.secret.propse.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "propose_log")
class ProposeLog(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val acceptedAt: LocalDateTime = LocalDateTime.now(),

    @Column(length = 500)
    val userAgent: String = "",
)
