// services/musicService.js
const musicRepository = require("../repositories/musicRepository");

// 1. Retornar todas as músicas
const returnAllMusics = async (req, res) => {
    try {
        const musics = await musicRepository.getAllMusics();
        res.status(200).json({ musics: musics });
    } catch (error) {
        console.error("Erro ao buscar músicas:", error);
        res.sendStatus(500);
    }
};

// 2. Retornar música por ID
const returnMusicById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const music = await musicRepository.getMusicById(id);

        if (music) {
            res.status(200).json(music);
        } else {
            res.status(404).json({ message: "Música não encontrada" });
        }
    } catch (error) {
        console.error("Erro ao buscar música:", error);
        res.sendStatus(500);
    }
};

// 3. Criar nova música
const createMusic = async (req, res) => {
    const { id, name } = req.body; // Adaptar conforme seu Model Music.js
    
    try {
        if (!id || !name) {
            return res.status(400).json({ message: "ID e name são obrigatórios." });
        }
        
        const newMusic = await musicRepository.createMusic({ id, name });
        res.status(201).json(newMusic);
    } catch (error) {
        console.error("Erro ao criar música:", error);
        res.sendStatus(500);
    }
};

// 4. Atualizar música
const updateMusic = async (req, res) => {
    const { name } = req.body;
    const id = parseInt(req.params.id);

    try {
        const updatedMusic = await musicRepository.updateMusic(id, { name });

        if (updatedMusic) {
            res.status(200).json(updatedMusic);
        } else {
            res.status(404).json({ message: "Música não encontrada" });
        }
    } catch (error) {
        console.error("Erro ao atualizar música:", error);
        res.sendStatus(500);
    }
};

// 5. Deletar música
const deleteMusic = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const removedMusic = await musicRepository.deleteMusic(id);

        if (removedMusic) {
            res.status(200).json({
                message: "Música removida com sucesso.",
                music: removedMusic,
            });
        } else {
            res.status(404).json({ message: "Música não encontrada" });
        }
    } catch (error) {
        // Erro de FK (A música está em uma playlist)
        if (error.name === 'SequelizeForeignKeyConstraintError') {
             return res.status(400).json({ message: "Esta música está em uma ou mais playlists e não pode ser deletada." });
        }
        console.error("Erro ao deletar música:", error);
        res.status(500).json({ message: "Erro ao deletar música" });
    }
};

module.exports = {
    returnAllMusics,
    returnMusicById,
    createMusic,
    updateMusic,
    deleteMusic,
};