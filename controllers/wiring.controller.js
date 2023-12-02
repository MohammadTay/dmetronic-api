import Wiring from "../models/wiring.model.js";
import createError from "../utils/createError.js";

export const createWiring = async (req, res, next) => {
    if (!req.isSeller)
        return next(createError(403, "Only sellers can create a wiring!"));

    const newWiring = new Wiring({
        userId: req.userId,
        ...req.body,
    });

    try {
        const savedWiring = await newWiring.save();
        res.status(201).json(savedWiring);
    } catch (err) {
        next(err);
    }
};
export const deleteWiring = async (req, res, next) => {
    try {
        const wiring = await Wiring.findById(req.params.id);
        if (wiring.userId !== req.userId)
            return next(createError(403, "You can delete only your wiring!"));

        await Wiring.findByIdAndDelete(req.params.id);
        res.status(200).send("Wiring has been deleted!");
    } catch (err) {
        next(err);
    }
};
export const getWiring = async (req, res, next) => {
    try {
        const wiring = await Wiring.findById(req.params.id);
        if (!wiring) next(createError(404, "Wiring not found!"));
        res.status(200).send(wiring);
    } catch (err) {
        next(err);
    }
};
export const getWirings = async (req, res, next) => {
    const q = req.query;
    const filters = {
        ...(q.userId && { userId: q.userId }),
        ...(q.Name && { Name: q.Name }),
        ...((q.min || q.max) && {
            Price: {
                ...(q.min && { $gt: q.min }),
                ...(q.max && { $lt: q.max }),
            },
        }),
        ...(q.search && { Description: { $regex: q.search, $options: "i" } }),
    };
    try {
        const wirings = await Wiring.find(filters).sort({ [q.sort]: -1 });
        res.status(200).send(wirings);
    } catch (err) {
        next(err);
    }
};
