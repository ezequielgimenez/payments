import { User } from "models/user";
import { Order } from "models/orders";

User.hasMany(Order);
Order.belongsTo(User);

export { User, Order };
