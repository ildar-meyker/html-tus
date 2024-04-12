export default function relativeOffset($item, $block) {
    const itemOffset = $item.offset();
    const blockOffset = $block.offset();

    return {
        top: itemOffset.top - blockOffset.top,
        left: itemOffset.left - blockOffset.left,
    };
}
