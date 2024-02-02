const compareValueWithDropdownOption = (option, value) => {
    return option.toLowerCase().includes(value.toLowerCase()) ? option : ''
}

export default compareValueWithDropdownOption