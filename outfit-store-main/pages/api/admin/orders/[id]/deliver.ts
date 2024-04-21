import db from "@/utils/db"
import Order from '@/models/Order';
import { getSession } from "next-auth/react";



const handler = async (req:any, res:any) => {
    const session:any = await getSession({ req });
    if (!session || (session && !session.user.isAdmin)) {
        return res.status(401).send('Error: Signin required')
    }
await db.connect();
const order = await  Order.findById(req.query.id)
if(order){
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const deliverdOrder = await order.save();
    await db.disconnect();
    res.send({
        message: 'order delivered successefully',
        order: deliverdOrder
    })
}else{
    await db.disconnect();
    res.status(404).send({message: 'Error: order not found'});
  }
};
export default handler