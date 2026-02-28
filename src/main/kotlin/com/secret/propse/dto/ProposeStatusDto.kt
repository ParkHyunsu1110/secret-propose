package com.secret.propse.dto

import java.time.LocalDateTime

data class ProposeStatusDto(
    val accepted: Boolean,
    val acceptedAt: LocalDateTime?,
)
