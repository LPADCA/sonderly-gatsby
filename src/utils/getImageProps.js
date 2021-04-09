export const getImageProps = ({ fluid, fixed, dimensions, ...other }) => {
    // eslint-disable-next-line no-unused-vars
    const { aspectRatio, ...props } = fluid || fixed
    return {
        ...props,
        ...dimensions,
        ...other,
    }
}
