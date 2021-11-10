function getError(err) {

    // On production:
    if(config.isProduction) {
        return "Some error occurred, please try again later.";
    }

    // On development:
    return err.message;
}

module.exports = {
    getError
};
