export const getImageProps = ({ fluid, dimensions }) => {
    // eslint-disable-next-line no-unused-vars
    const { aspectRatio, ...props } = fluid
    return {
        ...props,
        ...dimensions,
    }
}