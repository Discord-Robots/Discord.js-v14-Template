async function loadComponents(client) {
    //Buttons
    const Buttons = await utils.loadFiles("./Components/Buttons");
    Buttons.forEach(async (file) => {
        const button = require(file);
        components.buttons.set(button.id, button);
    })

    //Select Menus
    const SelectMenus = await utils.loadFiles("./Components/SelectMenus");
    SelectMenus.forEach((file) => {
        const selectMenu = require(file)
        components.selectMenus.set(selectMenu.id, selectMenu);
    })

    //Modals
    const Modals = await utils.loadFiles("./Components/Modals");
    Modals.forEach((file) => {
        const modal = require(file)
        components.modals.set(modal.id, modal);
    })
}

module.exports = { loadComponents };