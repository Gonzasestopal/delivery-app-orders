

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

function filterRecentlyAddedOrders(order) {
    const now = new Date()
    const diff = now - order.created_at;
    return (diff / 60000) >= 5;

}


module.exports = {
    areWorkingHours,
    calculateTotals,
    filterRecentlyAddedOrders,
}
