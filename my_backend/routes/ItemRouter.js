import express from 'express';
import {
    getItems as getItemsFunction,
    getItemById as getItemByIdFunction,
    createItem as createItemFunction,
    deleteItem as deleteItemFunction,
    updateItem as updateItemFunction,
    findItemsByUserId as findItemsByUserIdFunction,
    getAvailableItems as getAvailableItemsFunction,
} from "../dataAccess/ItemDA.js";

let itemRouter = express.Router();

itemRouter.route("/items")
    .get(async (req, res) => {
        return res.json(await getItemsFunction());
    })
    .post(async (req, res) => {
        return res.status(201).json(await createItemFunction(req.body));
    });

itemRouter.route("/item/:id")
    .get(async (req, res) => {
        return res.json(await getItemByIdFunction(req.params.id));
    })
    .put(async (req, res) => {
        return res.json(await updateItemFunction(req.params.id, req.body));
    })
    .delete(async (req, res) => {
        return res.json(await deleteItemFunction(req.params.id));
    });

itemRouter.route("/user/:id/items")
    .get(async (req, res) => {
        return res.json(await findItemsByUserIdFunction(req.params.id));
    });

itemRouter.route("/items/available")
    .get(async (req, res) => {
        return res.json(await getAvailableItemsFunction());
    });

export default itemRouter;