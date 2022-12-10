
export function toIsoDate(date:Date){
    const timeCreated = date.toJSON().split('.')[0];
        let timeData = timeCreated.split('T')[0];
        const timeH = timeCreated.split('T')[1];
        timeData = timeData.split('-').reverse().join('-');
        const currentDataCreated = timeH + ' / ' + timeData;
        return currentDataCreated
}
      