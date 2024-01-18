import Item from "../entity/Item.js";
import User from "../entity/User.js";

async function getItems() {
    return await Item.findAll();
}

async function getItemById(id) {
    return await Item.findByPk(id);
}

async function createItem(item) {
    try {
        let createdItem = await Item.create(item);
        return { error: false, msg: "Item created successfully", obj: createdItem };
    } catch (error) {
        console.error('Error during item creation:', error);
        return { error: true, msg: "Error creating item" };
    }
}

async function deleteItem(id) {
    let item = await Item.findByPk(id);
    if (!item) {
        return { error: true, msg: "Item not found" };
    }

    await item.destroy();
    return { error: false, msg: "Item deleted successfully" };
}

async function updateItem(id, updatedItem) {
    try {
        let item = await Item.findByPk(id);
        if (!item) {
            return { error: true, msg: "Item not found" };
        }

        await item.update(updatedItem);
        return { error: false, msg: "Item updated successfully", obj: item };
    } catch (error) {
        console.error('Error during item update:', error);
        return { error: true, msg: "Error updating item" };
    }
}

async function findItemsByUserId(userId) {
    return await Item.findAll({
        where: {
            user_id: userId
        },
        include: [{
            model: User,
            attributes: ['username'], // Include user data if needed
        }],
    });
}

async function getAvailableItems() {
    return await Item.findAll({
        where: {
            available_to_share: true
        },
        include: [{
            model: User,
            attributes: ['username'], // Include user data if needed
        }],
    });
}

export {
    getItems,
    getItemById,
    createItem,
    deleteItem,
    updateItem,
    findItemsByUserId,
    getAvailableItems,
};