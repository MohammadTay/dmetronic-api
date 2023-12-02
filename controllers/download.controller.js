import Download from "../models/download.model.js";
import createError from "../utils/createError.js";

export const createDownload = async (req, res, next) => {
    if (!req.isSeller)
        return next(createError(403, "Only sellers can create a Download!"));

    const newDownload = new Download({
        userId: req.userId,
        ...req.body,
    });

    try {
        const savedDownload = await newDownload.save();
        res.status(201).json(savedDownload);
    } catch (err) {
        next(err);
    }
};
export const deleteDownload = async (req, res, next) => {
    try {
        const download = await Download.findById(req.params.id);
        if (download.userId !== req.userId)
            return next(createError(403, "You can delete only your Download!"));

        await Download.findByIdAndDelete(req.params.id);
        res.status(200).send("Download has been deleted!");
    } catch (err) {
        next(err);
    }
};
export const getDownload = async (req, res, next) => {
    try {
        const download = await Download.findById(req.params.id);
        if (!download) next(createError(404, "Download not found!"));
        res.status(200).send(download);
    } catch (err) {
        next(err);
    }
};
export const getDownloads = async (req, res, next) => {
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
        const downloads = await Download.find(filters).sort({ [q.sort]: -1 });
        res.status(200).send(downloads);
    } catch (err) {
        next(err);
    }
};
