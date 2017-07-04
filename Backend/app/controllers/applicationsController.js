exports.exitApplication = (req, res) => {
    process.exitCode = 0;
    process.exit();
};

