import { Router } from "express";
import { phonebookMongoRepository } from "./repository";

export const phonebookRouter = Router();
const repo = new phonebookMongoRepository();
phonebookRouter.get('/', async (req, res) => {
    try {
        const phonebook = await repo.getAllPhonebook();
        res.status(200).json({ message: "OK", data: phonebook });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
})
phonebookRouter.post('/', async (req, res) => {
    const {name, number} = req.body;
    try {
        const phone = await repo.createOne(name, number);
        res.status(200).json({ message: "OK", data: phone });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
})
phonebookRouter.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {name, number} = req.body;
    try {
        await repo.updateOne(id, name, number);
        res.status(200).json({ message: "OK" });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
})
phonebookRouter.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await repo.deleteOne(id);
        res.status(200).json({ message: "OK" });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
})
