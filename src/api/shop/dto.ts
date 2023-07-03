export class Shop {
    id = "";
    name = "";
    isOnline?= "";
    categoryId = "";
    areaId?= "";
    imageUrl = "";
    imageFile?= null;
    workTimes: WorkTimes[] = [{ ...new WorkTimes() }];

}
export class WorkTimes {
    dayOfWeek = 1;
    startTime = {
        ticks: 0
    };
    endTime = {
        ticks: 0
    }
}
export class Products {
    id = '';
    name = "";
    imageUrl = '';
    cost = 0;
}