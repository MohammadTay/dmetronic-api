import Software from "../models/software.model.js";
import createError from "../utils/createError.js";

export const createSoftware = async (req, res, next) => {
    if (!req.isSeller)
        return next(createError(403, "Only sellers can create a Software!"));

    const newSoftware = new Software({
        userId: req.userId,
        ...req.body,
    });

    try {
        const savedSoftware = await newSoftware.save();
        res.status(201).json(savedSoftware);
    } catch (err) {
        next(err);
    }
};
export const deleteSoftware = async (req, res, next) => {
    try {
        const software = await Software.findById(req.params.id);
        if (software.userId !== req.userId)
            return next(createError(403, "You can delete only your Software!"));

        await Software.findByIdAndDelete(req.params.id);
        res.status(200).send("Software has been deleted!");
    } catch (err) {
        next(err);
    }
};
export const getSoftware = async (req, res, next) => {
    try {
        const software = await Software.findById(req.params.id);
        if (!software) next(createError(404, "Software not found!"));
        res.status(200).send(software);
    } catch (err) {
        next(err);
    }
};
export const getSoftwares = async (req, res, next) => {
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
        const softwares = await Software.find(filters).sort({ [q.sort]: -1 });
        res.status(200).send(softwares);
    } catch (err) {
        next(err);
    }
};
