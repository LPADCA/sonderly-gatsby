export const getImageProps = ({ fluid, fixed, dimensions }) => {
    // eslint-disable-next-line no-unused-vars
    const { aspectRatio, ...props } = fluid || fixed
    return {
        ...props,
        ...dimensions,
    }
}
