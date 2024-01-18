import express from 'express';
import{
    getUsers as getUsersFunction,
    getUserById as getUserByIdFunction,
    createUser as createUserFunction,
    updateUser as updateUserFunction,
    deleteUser  as deleteUserFunction
} from '../dataAccess/UserDA.js';

let userRouter = express.Router();

userRouter.route("/users")
    .get(async (req, res) => {
        return res.json(await getUsersFunction());
    })
    .post(async (req, res) => {
        return res.status(201).json(await createUserFunction(req.body));
    });

userRouter.route("/user/:id")
    .get(async (req, res) => {
        return res.json(await getUserByIdFunction(req.params.id));
    })
    .put(async (req, res) => {
        return res.json(await updateUserFunction(req.params.id, req.body));
    })
    .delete(async (req, res) => {
        return res.json(await deleteUserFunction(req.params.id));
    });

export default userRouter;