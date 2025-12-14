const model = require("../models");

// 1. Obter todas as músicas
const getAllMusics = async () => {
    return await model.Music.findAll();
};

// 2. Obter música por ID
const getMusicById = async (id) => {
    return await model.Music.findByPk(id);
};

// 3. Criar nova música
const createMusic = async (musicData) => {
    return await model.Music.create(musicData);
};

// 4. Atualizar música
const updateMusic = async (id, musicData) => {
    try {
        await model.Music.update(musicData, { where: { id: id } });
        return await model.Music.findByPk(id);
    } catch (error) {
        throw error;
    }
};

// 5. Deletar música
const deleteMusic = async (id) => {
    const musicToDelete = await model.Music.findByPk(id);
    if (!musicToDelete) {
        return null;
    }
    await model.Music.destroy({ where: { id: id } });
    return musicToDelete;
};

module.exports = {
    getAllMusics,
    getMusicById,
    createMusic,
    updateMusic,
    deleteMusic,
};