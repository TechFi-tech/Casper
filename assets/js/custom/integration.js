let integrationFrontendDefault = 'https://staging.i-frontend.techfi.tech';
// let integrationFrontendDefault = 'http://localhost:3000';
let integrationFrontend = integrationFrontendDefault;
try {
    integrationFrontend = integrationFrontendURL;
} catch (e) {
    console.log(e);
}
function addValueToAttr(elementId,attrKey,attrValue) {
    document.getElementById(elementId).setAttribute(attrKey, attrValue);
}
