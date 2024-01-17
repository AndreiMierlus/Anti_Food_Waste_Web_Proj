import FriendGroup from "../entity/FriendGroup";
import User from "../entity/User";

async function getFriendshipRelations(userId) {
    try {
        const userExists = await User.findByPk(userId);
        if (!userExists) {
            return { error: true, msg: "User doesn't exist" };
        }

        const friendshipRelations = await FriendGroup.findAll({
            where: {
                user_id: userId,
            },
            include: [{
                model: User,
                as: "Receiver",
            }],
        });

        return { error: false, data: friendshipRelations };
    } catch (error) {
        console.error('Error fetching friendship relations:', error);
        return { error: true, msg: "Server error" };
    }
}

async function getFriendshipRelationByName(userId, userName) {
    try {
        const userExists = await User.findByPk(userId);
        if (!userExists) {
            return { error: true, msg: "User doesn't exist" };
        }

        const friendshipRelations = await FriendGroup.findAll({
            where: {
                user_id: userId,
            },
            include: [{
                model: User,
                where: { username: userName },
                as: "Receiver",
            }],
        });

        return { error: false, data: friendshipRelations };
    } catch (error) {
        console.error('Error fetching friendship relation by name:', error);
        return { error: true, msg: "Server error" };
    }
}

async function postFriendshipRelation(senderId, receiverId, category) {
    try {
        const isUnique = await isIdUnique(senderId, receiverId);
        if (!isUnique) {
            return { error: true, msg: "Friendship relation already exists" };
        }

        const friendshipRelation = await FriendGroup.create({
            user_id: senderId,
            receiver_id: receiverId,
            category: category,
        });

        return { error: false, data: friendshipRelation };
    } catch (error) {
        console.error('Error creating friendship relation:', error);
        return { error: true, msg: "Server error" };
    }
}

async function putFriendshipRelation(id, category) {
    try {
        const friendshipRelation = await FriendGroup.findByPk(id);
        if (!friendshipRelation) {
            return { error: true, msg: "Friendship relation not found" };
        }

        await friendshipRelation.update({ category: category });

        return { error: false, data: friendshipRelation };
    } catch (error) {
        console.error('Error updating friendship relation:', error);
        return { error: true, msg: "Server error" };
    }
}

async function deleteFriend(friendId) {
    try {
        const friendshipRelation = await FriendGroup.findByPk(friendId);
        if (!friendshipRelation) {
            return { error: true, msg: "Friendship relation not found" };
        }

        await friendshipRelation.destroy();
        return { error: false, msg: "Friendship relation deleted successfully" };
    } catch (error) {
        console.error('Error deleting friendship relation:', error);
        return { error: true, msg: "Server error" };
    }
}

async function isIdUnique(senderId, receiverId) {
    const existingRelation = await FriendGroup.findOne({
        where: {
            user_id: senderId,
            receiver_id: receiverId,
        },
    });

    return !existingRelation;
}

export {
    getFriendshipRelations,
    getFriendshipRelationByName,
    postFriendshipRelation,
    putFriendshipRelation,
    deleteFriend,
};