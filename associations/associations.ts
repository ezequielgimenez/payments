import { User } from "models/user";
import { Order } from "models/orders";

User.hasMany(Order);
Order.hasOne(User);

export { User, Order };
