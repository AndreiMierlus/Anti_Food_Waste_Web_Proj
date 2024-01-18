import FriendRequest from "../entity/FriendRequest.js";
import User from "../entity/User.js";

async function getAllReceivedFriendRequests(userId) {
    try {
        const userExists = await User.findByPk(userId);
        if (!userExists) {
            return { error: true, msg: "User doesn't exist" };
        }

        const friendRequests = await FriendRequest.findAll({
            where: {
                receiver_id: userId,
            },
            include: [{
                model: User,
                as: "Sender",
            }],
        });

        return { error: false, data: friendRequests };
    } catch (error) {
        console.error('Error fetching received friend requests:', error);
        return { error: true, msg: "Server error" };
    }
}

async function deleteFriendRequest(id) {
    try {
        const friendRequest = await FriendRequest.findByPk(id);
        if (!friendRequest) {
            return { error: true, msg: "FriendRequest not found" };
        }

        await friendRequest.destroy();
        return { error: false, msg: "FriendRequest deleted successfully" };
    } catch (error) {
        console.error('Error deleting friend request:', error);
        return { error: true, msg: "Server error" };
    }
}

async function postFriendRequest(senderId, receiverId, date) {
    try {
        const isUnique = await isIdUnique(senderId, receiverId);
        if (!isUnique) {
            return { error: true, msg: "FriendRequest already exists" };
        }

        const friendRequest = await FriendRequest.create({
            sender_id: senderId,
            receiver_id: receiverId,
            date: date,
        });

        return { error: false, data: friendRequest };
    } catch (error) {
        console.error('Error creating friend request:', error);
        return { error: true, msg: "Server error" };
    }
}

async function isIdUnique(senderId, receiverId) {
    const existingRequest = await FriendRequest.findOne({
        where: {
            sender_id: senderId,
            receiver_id: receiverId,
        },
    });

    return !existingRequest;
}

export {
    getAllReceivedFriendRequests,
    deleteFriendRequest,
    postFriendRequest,
};