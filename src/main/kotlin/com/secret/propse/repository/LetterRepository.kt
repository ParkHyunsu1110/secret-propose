package com.secret.propse.repository

import com.secret.propse.entity.Letter
import org.springframework.data.jpa.repository.JpaRepository

interface LetterRepository : JpaRepository<Letter, Long>
