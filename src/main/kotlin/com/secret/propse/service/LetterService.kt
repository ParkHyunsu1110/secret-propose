package com.secret.propse.service

import com.secret.propse.dto.LetterDto
import com.secret.propse.exception.BusinessException
import com.secret.propse.common.ResultCode
import com.secret.propse.repository.LetterRepository
import org.springframework.stereotype.Service
import tools.jackson.databind.ObjectMapper

@Service
class LetterService(
    private val letterRepository: LetterRepository,
    private val objectMapper: ObjectMapper,
) {

    fun fetchLetter(): LetterDto {
        val letter = letterRepository.findAll().firstOrNull()
            ?: throw BusinessException(ResultCode.NOT_FOUND)

        val paragraphs: List<String> = objectMapper.readValue(letter.paragraphs, List::class.java)
            .filterIsInstance<String>()

        return LetterDto(
            greeting = letter.greeting,
            closing = letter.closing,
            paragraphs = paragraphs,
        )
    }
}
