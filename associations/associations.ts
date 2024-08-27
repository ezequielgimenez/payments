import { User } from "models/user";
import { Auth } from "models/auth";
import { Order } from "models/orders";

User.hasMany(Order);
User.hasOne(Auth);
Order.belongsTo(User);

export { User, Order, Auth };
