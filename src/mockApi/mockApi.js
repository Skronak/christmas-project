export async function addItem(userId, name, comment) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ id: Date.now(), userId, name, comment, done: false, doneComment: "" });
        }, 300);
    });
}

export async function deleteItem(userId, id) {
    return new Promise(resolve => setTimeout(resolve, 200));
}

export async function updateItems(user, id, name, comment) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ id, userId: user.id, name, comment, done: false, doneComment: "" });
        }, 300);
    });
}
