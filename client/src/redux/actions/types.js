export const TYPES = {
    AUTH_ACTION: 'AUTH_ACTION',
    ALERT_ACTION: 'ALERT_ACTION',
    THEME_ACTION: 'THEME_ACTION'
}

export const EditData = (data, id, post) => {
    return data.map(item => (item._id === id ? post : item))
}

export const DeleteData = (data, id) => {
    return data.filter(item => item._id !== id)
}