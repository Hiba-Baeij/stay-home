export class Home {
    employeesCount = 0;
    driversCount = 0;
    customersCount = 0;
    shopsCount = 0;
    ordersCount = 0;
    bestShops: Best[] = [];
    bestDrivers: Best[] = [];
    shippingOrderCountMonthly = [0];
    deliveryOrderCountMonthly = [0];
    passengerOrderCountMonthly = [0]
}

export class Best {
    id = ""
    name = "";
    imageUrl = ""
}
