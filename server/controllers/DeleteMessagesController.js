import Message from "../models/MessageModel.js";
import mongoose from "mongoose";

export const deleteMsgBothSide = async (req,res,next) =>{
    try{
        const {sender,receiver} = req.body;

        const senderObjectId = new mongoose.Types.ObjectId(sender);
        const receiverObjectId = new mongoose.Types.ObjectId(receiver);
        //console.log('s',senderObjectId,'r',receiverObjectId);


        const result = await Message.deleteMany({
            $or: [
            { sender: senderObjectId, recipient: receiverObjectId },
            { sender: receiverObjectId, recipient: senderObjectId }
            ]
        });
        res.status(200).json({
            success: true,
            deletedCount: result.deletedCount,
        });
    }catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }

}
