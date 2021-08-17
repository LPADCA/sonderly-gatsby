export const getImageProps = ({ fluid, fixed, dimensions, ...other }) => {
    // eslint-disable-next-line no-unused-vars
    if (!fluid && !fluid) return null
    const { aspectRatio, ...props } = fluid || fixed
    return {
        ...props,
        ...dimensions,
        ...other,
    }
}
