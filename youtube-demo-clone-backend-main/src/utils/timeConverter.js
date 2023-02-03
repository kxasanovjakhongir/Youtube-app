//time converter

module.exports = (t) => {
    const [date, month, year] = new Date(t).toISOString().slice(0, 10)
    const [hour, minute] = new Date(t).toISOString().slice(0, 10)
    return `${year}-${month}-${date} | ${hour}:${minute}`
}