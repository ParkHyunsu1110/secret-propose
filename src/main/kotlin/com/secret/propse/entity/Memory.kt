package com.secret.propse.entity

import jakarta.persistence.*

@Entity
@Table(name = "memory")
class Memory(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val date: String = "",
    val place: String = "",
    val title: String = "",

    @Column(length = 1000)
    val description: String = "",

    val imagePath: String = "",
    val sortOrder: Int = 0,
)
