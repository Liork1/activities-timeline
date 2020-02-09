function snakeToTitleCase (value, seperator) {
    if (!value) return;
    return value.split(seperator).map((item) => {
        if (item === 'a') return item;
        return item.charAt(0).toUpperCase() + item.substring(1);
    }).join(' ');
}

export default snakeToTitleCase;