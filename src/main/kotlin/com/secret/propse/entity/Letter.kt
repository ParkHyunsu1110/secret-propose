package com.secret.propse.entity

import jakarta.persistence.*

@Entity
@Table(name = "letter")
class Letter(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val greeting: String = "",
    val closing: String = "",

    @Column(columnDefinition = "CLOB")
    val paragraphs: String = "",
)
