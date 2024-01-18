import express from 'express';
import {
    getAllReceivedFriendRequests as getFriendRequestsFunction,
    deleteFriendRequest as deleteFriendRequestFunction,
    postFriendRequest as postFriendRequestFunction,
} from "../dataAccess/FriendRequestDA.js";

let friendRequestRouter = express.Router();

friendRequestRouter.route("/friendRequests")
    .get(async (req, res) => {
        return res.json(await getFriendRequestsFunction());
    })
    .post(async (req, res) => {
        return res.status(201).json(await postFriendRequestFunction(req.body));
    });

friendRequestRouter.route("/friendRequest/:id")
    .delete(async (req, res) => {
        return res.json(await deleteFriendRequestFunction(req.params.id));
    });

export default friendRequestRouter;