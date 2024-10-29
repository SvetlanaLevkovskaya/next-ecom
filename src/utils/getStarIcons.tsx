import Image from 'next/image'

export const getStarIcons = (rating: number) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Image key={`full-star-${i}`} src="/full-star.svg" alt="full star" width={9} height={10} />
    )
  }

  if (hasHalfStar) {
    stars.push(<Image key="half-star" src="/half-star.svg" alt="half star" width={9} height={10} />)
  }

  while (stars.length < 5) {
    stars.push(
      <Image key={`star-${stars.length}`} src="/star.svg" alt="star" width={9} height={10} />
    )
  }

  return stars
}
