
export class Order {
    id = "";
    customerId = "";
    destination = "";
    isScheduled = true;
    source = "";
    shopId = ""
}
export class OrderDetails {
    id = "";
    customerId = "";
    destination = "";
    note = "";
    scheduleDate = "";
    shopId = "";
    source = "";
    weight = 0;
    cart = [
        {
            productId: "",
            quantity: 0
        }
    ];
    coast = 0;
    deliveryCoast = 0
}