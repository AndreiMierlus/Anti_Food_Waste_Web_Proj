import express from 'express';
import {
    getFriendshipRelations as getFriendshipRelationsFunction,
    getFriendshipRelationByName as getFriendshipRelationByNameFunction,
    postFriendshipRelation as postFriendshipRelationFunction,
    putFriendshipRelation as putFriendshipRelationFunction,
    deleteFriend as deleteFriendFunction,
} from '../dataAccess/FriendGroupDA.js';

let friendGroupRouter = express.Router();

friendGroupRouter.route("/friendship-relations")
    .get(async (req, res) => {
        return res.json(await getFriendshipRelationsFunction(req.params.userId));
    });

friendGroupRouter.route("/friendship-relation/:id")
    .get(async (req, res) => {
        return res.json(await getFriendshipRelationByNameFunction(req.params.userId, req.params.userName));
    });

friendGroupRouter.route("/friendship-relation")
    .post(async (req, res) => {
        return res.status(201).json(await postFriendshipRelationFunction(req.body.senderId, req.body.receiverId, req.body.category));
    });

friendGroupRouter.route("/friendship-relation/:id")
    .put(async (req, res) => {
        return res.json(await putFriendshipRelationFunction(req.params.id, req.body.category));
    })
    .delete(async (req, res) => {
        return res.json(await deleteFriendFunction(req.params.friendId));
    });

export default friendGroupRouter;
