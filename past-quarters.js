function getQuarters(year){
    return [new Date(year, 12 - 1, 31), new Date(year, 9 - 1, 30), new Date(year, 6 - 1, 30), new Date(year, 3 - 1, 31)];
}

function getLastQuarters(lessThanDay, howManyQuarters) {
    let year = lessThanDay.getFullYear();
    const quarters = getQuarters(year);

    const decreaseYear = () => {
        for (let i = 0; i < quarters.length; i++) {
            quarters[i] = new Date(quarters[i]);
            quarters[i].setFullYear(quarters[i].getFullYear() - 1);
        }
    };

    const closestQuarterIndex = () => {
        let index = quarters.findIndex(d => d < lessThanDay);
        while (index == -1) {
            decreaseYear();
            index = quarters.findIndex(d => d < lessThanDay);
        }
        return index;
    };

    const selectedQuarters = [];
    let quarterIndex = closestQuarterIndex();

    while (howManyQuarters-- > 0) {
        selectedQuarters.push(quarters[quarterIndex]);
        quarterIndex = (quarterIndex + 1) % quarters.length;

        if (quarterIndex === 0) {
            decreaseYear();
        }
    }

    return selectedQuarters;
}

function getLastFourQuarters(lessThanDay) {
    const year = lessThanDay.getFullYear();
    const quarters = [...getQuarters(year), ...getQuarters(year - 1)];

    const selectedQuarters = [];
    let index = quarters.findIndex(d => d < lessThanDay);
    
    for(let i = 0; index > -1 && i < 4; i++){
        selectedQuarters.push(quarters[index++]);
    }

    return selectedQuarters;
}
