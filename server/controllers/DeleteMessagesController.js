import Message from "../models/MessageModel.js";
import mongoose from "mongoose";
import Group from "../models/GroupModel.js";

export const deleteMsgBothSide = async (req,res,next) =>{
    try{
        const data = req.body;
        console.log(data);

        if(data.chatType === "group") {
            const memberIds = data.selectedChatData.members.map(
                id => new mongoose.Types.ObjectId(id)
            );
            const messageIds = data.selectedChatData.messages.map(
                id => new mongoose.Types.ObjectId(id)
            );
            const result = await Message.deleteMany({
                recipient:null,
                sender: { $in: memberIds },
                _id: { $in: messageIds }
            });

            const grpid = new mongoose.Types.ObjectId(data.selectedChatData._id);
            await Group.deleteOne(
                { _id: grpid },
            );
    
            res.status(200).json({
                success: true,
                deletedCount: result.deletedCount,
            });
        }


        if(data.chatType === "contact"){

            const senderObjectId = new mongoose.Types.ObjectId(data.userData.sender);
            const receiverObjectId = new mongoose.Types.ObjectId(data.userData._id);
            console.log(senderObjectId,receiverObjectId)

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
        }

        
    }catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }

}
