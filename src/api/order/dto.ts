export enum OrderStage {
    UnConfirmed = "UnConfirmed",
    Confirmed = "Confirmed",
    NewOrder = "NewOrder",
    InProcess = "InProcess",
    OnWay = "OnWay",
    Done = "Done",
    Cancel = "Cancel"
}
export class Order {
    id = ""
    customerId = ""
    destination = "";
    isScheduled = true;
    isHandled = true;
    source = "";
    shopId = ""
}

export class OrderDetails {
    id = "";
    customer = "";
    customerId?= "";
    date?= "";
    coast = 0;
    source = "";
    destination = "";
    note = "";
    scheduleDate?= "";
    shopId?= "";
    weight?= 0;
    deliveryCoast?= 0;
    cart?: Cart[] = [];
    currentStage = ""
    numberOfPassenger?= ""
}
class Cart {
    productId = "";
    quantity = 0
}