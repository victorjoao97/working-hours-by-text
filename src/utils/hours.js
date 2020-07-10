const setHours = (hourValue) => {
    let [hour, minutes] = String(hourValue).split(':')
    let dateStore = new Date()
    dateStore.setHours(parseInt(hour), parseInt(minutes))

    return dateStore
}

export { setHours }