import Image from 'next/image'

const STAR_SIZE = { width: 9, height: 10 }

export const getStarIcons = (rating: number) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const totalStars = 5

  return [
    ...Array.from({ length: fullStars }, (_, i) => (
      <Image key={`full-star-${i}`} src="/full-star.svg" alt="full star" {...STAR_SIZE} />
    )),
    ...(hasHalfStar
      ? [<Image key="half-star" src="/half-star.svg" alt="half star" {...STAR_SIZE} />]
      : []),
    ...Array.from({ length: totalStars - fullStars - (hasHalfStar ? 1 : 0) }, (_, i) => (
      <Image key={`empty-star-${i}`} src="/star.svg" alt="empty star" {...STAR_SIZE} />
    )),
  ]
}
