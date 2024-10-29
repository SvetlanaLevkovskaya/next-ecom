const pluralize = (count: number, singular: string, plural: string): string => {
  return count === 1 ? `${count} ${singular}` : `${count} ${plural}`
}

export const getItemsText = (count?: number): string => {
  if (typeof count === 'undefined') return ''
  return pluralize(count, 'item', 'items')
}
