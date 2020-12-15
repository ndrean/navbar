/* eslint-disable react-hooks/rules-of-hooks */

/* disabled eslint due to error */
const { useBabelRc, override } = require("customize-cra");

module.exports = override(useBabelRc());
