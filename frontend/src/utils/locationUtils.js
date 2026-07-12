export const formatLocation = ({ city, neighborhood }) => [neighborhood, city].filter(Boolean).join(', ')
