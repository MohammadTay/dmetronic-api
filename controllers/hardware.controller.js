import Hardware from "../models/hardware.model.js";
import createError from "../utils/createError.js";

export const createHardware = async (req, res, next) => {
    // if (!req.isSeller)
    //     return next(createError(403, "Only sellers can create a Hardware!"));

    const newHardware = new Hardware({
        userId: req.userId,
        ...req.body,
    });

    try {
        const savedHardware = await newHardware.save();
        res.status(201).json(savedHardware);
    } catch (err) {
        next(err);
    }
};
export const deleteHardware = async (req, res, next) => {
    try {
        const hardware = await Hardware.findById(req.params.id);
        if (hardware.userId !== req.userId)
            return next(createError(403, "You can delete only your Hardware!"));

        await Hardware.findByIdAndDelete(req.params.id);
        res.status(200).send("Hardware has been deleted!");
    } catch (err) {
        next(err);
    }
};
export const getHardware = async (req, res, next) => {
    try {
        const hardware = await Hardware.findById(req.params.id);
        if (!hardware) next(createError(404, "Hardware not found!"));
        res.status(200).send(hardware);
    } catch (err) {
        next(err);
    }
};
export const getHardwares = async (req, res, next) => {
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
        const hardwares = await Hardware.find(filters).sort({ [q.sort]: -1 });
        res.status(200).send(hardwares);
    } catch (err) {
        next(err);
    }
};
