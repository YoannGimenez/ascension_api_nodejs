const apiKey = process.env.API_KEY;

const checkApiKey = (req, res, next) => {
    const api_key_header = req.header('x-api-key');
    if (api_key_header === apiKey) {
        next();
    } else {
        res.status(401).json({ message: "Accès non autorisé : clé API invalide" });
    }
};

module.exports = checkApiKey;
