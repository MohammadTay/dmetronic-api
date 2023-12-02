import Pinout from "../models/pinout.model.js";
import createError from "../utils/createError.js";

export const createPinout = async (req, res, next) => {
    if (!req.isSeller)
        return next(createError(403, "Only sellers can create a Pinout!"));

    const newPinout = new Pinout({
        userId: req.userId,
        ...req.body,
    });

    try {
        const savedPinout = await newPinout.save();
        res.status(201).json(savedPinout);
    } catch (err) {
        next(err);
    }
};
export const deletePinout = async (req, res, next) => {
    try {
        const pinout = await Pinout.findById(req.params.id);
        if (pinout.userId !== req.userId)
            return next(createError(403, "You can delete only your Pinout!"));

        await Pinout.findByIdAndDelete(req.params.id);
        res.status(200).send("Pinout has been deleted!");
    } catch (err) {
        next(err);
    }
};
export const getPinout = async (req, res, next) => {
    try {
        const pinout = await Pinout.findById(req.params.id);
        if (!pinout) next(createError(404, "Pinout not found!"));
        res.status(200).send(pinout);
    } catch (err) {
        next(err);
    }
};
export const getPinouts = async (req, res, next) => {
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
        const pinouts = await Pinout.find(filters).sort({ [q.sort]: -1 });
        res.status(200).send(pinouts);
    } catch (err) {
        next(err);
    }
};
