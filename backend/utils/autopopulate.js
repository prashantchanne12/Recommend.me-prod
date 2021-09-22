export default (field) => function (next) {

    if (field === 'from') {
        this.populate(field, { displayName: 1, userName: 1, image: 1 });
    } else {
        this.populate(field);
    }
    next();
};