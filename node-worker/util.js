const getTokenNameById = (id) => {
    switch (id) {
        case 0:
            return "Flow Token"
        case 1:
            return "TUSD"
        case 2:
            return "TEUR"
        case 3:
            return "TGBP"
        default:
            return "Flow Token"
    }
}


module.exports = {
    getTokenNameById
}