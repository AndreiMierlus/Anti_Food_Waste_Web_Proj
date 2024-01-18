import express from 'express';
import {
    getItemClaims as getItemClaimsFunction,
    getItemClaimById as getItemClaimByIdFunction,
    createItemClaim as createItemClaimFunction,
    deleteItemClaim as deleteItemClaimFunction,
} from "../dataAccess/ItemClaimDA.js";

let itemClaimRouter = express.Router();

itemClaimRouter.route("/itemClaims")
    .get(async (req, res) => {
        return res.json(await getItemClaimsFunction());
    })
    .post(async (req, res) => {
        return res.status(201).json(await createItemClaimFunction(req.body));
    });

itemClaimRouter.route("/itemClaim/:id")
    .get(async (req, res) => {
        return res.json(await getItemClaimByIdFunction(req.params.id));
    })
    .put(async (req, res) => {
        return res.json(await deleteItemClaimFunction(req.params.id, req.body));
    });

export default itemClaimRouter;