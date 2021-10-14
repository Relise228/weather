export const color_changer = (temp) => {
    if (temp <= -10) return '#00ffff';
    else if (temp === 10) return '#fff700';
    else if (temp >= 30) return '#ff8c00';
    else return '#212529'
}

export const cookie = () => {
    let cookie = {}
    document.cookie.split('; ').forEach(record => {
        cookie = {
            ...cookie,
            [`${record.split('=')[0]}`]: record.split('=')[1]
        }
    })

    return cookie
}