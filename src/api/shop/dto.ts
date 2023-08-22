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
    dayOfWeek = 'Saturday';
    startTime = '00:00:00';
    endTime = '00:00:00';
}
export class Products {
    id = '';
    name = "";
    imageUrl = '';
    cost = 0;
}
export class Days {
    days = [
        {
            title: 'السبت',
            value: 'Saturday'
        },
        {
            title: 'الاحد',
            value: 'Sunday'
        },
        {
            title: 'الاثنين',
            value: 'Monday'
        },
        {
            title: 'الثلاثاء',
            value: 'Tuesday'
        },
        {
            title: 'الاربعاء',
            value: 'Wednesday'
        },
        {
            title: 'الخميس',
            value: 'Thursday'
        },
        {
            title: 'الجمعة',
            value: 'Friday'
        },
    ]

}