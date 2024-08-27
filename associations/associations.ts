import { User } from "models/user";
import { Auth } from "models/auth";
import { Order } from "models/orders";

User.hasMany(Order);

export { User, Order, Auth };
