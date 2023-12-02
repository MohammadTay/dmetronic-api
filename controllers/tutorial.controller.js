import Tutorial from "../models/tutorial.model.js";
import createError from "../utils/createError.js";

export const createTutorial = async (req, res, next) => {
    if (!req.isSeller)
        return next(createError(403, "Only sellers can create a Tutorial!"));

    const newTutorial = new Tutorial({
        userId: req.userId,
        ...req.body,
    });

    try {
        const savedTutorial = await newTutorial.save();
        res.status(201).json(savedTutorial);
    } catch (err) {
        next(err);
    }
};
export const deleteTutorial = async (req, res, next) => {
    try {
        const tutorial = await Tutorial.findById(req.params.id);
        if (tutorial.userId !== req.userId)
            return next(createError(403, "You can delete only your Tutorial!"));

        await Tutorial.findByIdAndDelete(req.params.id);
        res.status(200).send("Tutorial has been deleted!");
    } catch (err) {
        next(err);
    }
};
export const getTutorial = async (req, res, next) => {
    try {
        const tutorial = await Tutorial.findById(req.params.id);
        if (!tutorial) next(createError(404, "tutorial not found!"));
        res.status(200).send(tutorial);
    } catch (err) {
        next(err);
    }
};
export const getTutorials = async (req, res, next) => {
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
        const tutorials = await Tutorial.find(filters).sort({ [q.sort]: -1 });
        res.status(200).send(tutorials);
    } catch (err) {
        next(err);
    }
};
