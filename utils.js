

function areWorkingHours(date) {
    opening = new Date()
    opening.setHours('10')

    closing = new Date()
    closing.setHours('22')

    return opening >= date >= closing
}

function calculateTotals(mealOptionsTotal, mealsTotal, tip) {
    const subtotal = mealsTotal + mealOptionsTotal
    const subtotalTip = subtotal * (tip / 100)
    const total = subtotal + subtotalTip

    return { subtotal, subtotalTip, total }
}


module.exports = {
    areWorkingHours,
    calculateTotals,
}
