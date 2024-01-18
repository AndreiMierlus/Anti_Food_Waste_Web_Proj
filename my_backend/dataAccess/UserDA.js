import User from "../entity/User.js";

async function getUsers() {
    return await User.findAll();
}

async function getUserById(id) {
    return await User.findByPk(id);
}

async function createUser(user) {
    try {
        let createdUser = await User.create(user);
        return { error: false, msg: "User created successfully", obj: createdUser };
    } catch (error) {
        console.error('Error during user creation:', error);
        return { error: true, msg: "Error creating user" };
    }
}

async function deleteUser(id) {
    let user = await User.findByPk(id);
    return await user.destroy();
}

async function updateUser(id, updatedUser) {
    try {
        let user = await User.findByPk(id);
        if (user) {
            await user.update(updatedUser);
            return { error: false, msg: "User updated successfully", obj: user };
        } else {
            return { error: true, msg: "User not found" };
        }
    } catch (error) {
        console.error('Error during user update:', error);
        return { error: true, msg: "Error updating user" };
    }
}

export {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};