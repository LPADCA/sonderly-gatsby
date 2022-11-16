export const getImageProps = ({ fluid, fixed, dimensions, ...other }) => {
    // eslint-disable-next-line no-unused-vars
    if (!fluid && !fixed) return null
    const { aspectRatio, ...props } = fluid || fixed
    console.log(props, dimensions, other)
    return {
        ...props,
        ...dimensions,
        ...other,
    }
}
