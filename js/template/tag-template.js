const createTagElement = (tagValue) => {
    const tag = document.createElement('span')
    tag.classList.add('tag')

    const value = document.createElement('span')
    value.classList.add('tag-value')
    value.textContent = tagValue

    const deleteButton = document.createElement('button')

    var icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('width', '17');
    icon.setAttribute('height', '17');
    icon.setAttribute('viewBox', '0 0 17 17');
    icon.setAttribute('fill', 'none');

    var iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    iconPath.setAttribute('d', 'M15 15L8.5 8.5M8.5 8.5L2 2M8.5 8.5L15 2M8.5 8.5L2 15');
    iconPath.setAttribute('stroke', '#7A7A7A');
    iconPath.setAttribute('stroke-width', '2.16667');
    iconPath.setAttribute('stroke-linecap', 'round');
    iconPath.setAttribute('stroke-linejoin', 'round');

    icon.appendChild(iconPath)
    deleteButton.appendChild(icon)

    tag.appendChild(value)
    tag.appendChild(deleteButton)

    document.querySelector('.tags-container').appendChild(tag)
}

export default createTagElement