export const getImageProps = ({ fluid, fixed, dimensions, ...other }) => {
    // eslint-disable-next-line no-unused-vars
    if (!fluid && !fixed) return null
    const { aspectRatio, ...props } = fluid || fixed
    return {
        ...props,
        ...dimensions,
        ...other,
    }
}
