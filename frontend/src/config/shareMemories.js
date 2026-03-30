/**
 * 공개(share) 플로우에서만 보여줄 memory id 목록 (순서 유지).
 * 전체 카드는 card-news.json 기준이며, 여기 순서대로 필터한다.
 */
export const SHARE_MEMORY_IDS_ORDERED = [
  1, 2, 3, 4, 11, 12, 13, 14, 20, 21, 22, 23, 24, 30, 34, 42, 43, 44, 45, 46,
  48, 49, 50, 51, 52, 53, 54, 56, 57, 58, 61, 62, 63, 64, 67, 68, 70, 71, 72,
  74, 75, 76, 77, 78, 81, 86, 87, 88, 89, 90, 91,
]

export const SHARE_MEMORY_ID_SET = new Set(SHARE_MEMORY_IDS_ORDERED)
