export default function() {
    this.execute = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Hello');
                resolve(true);
            }, 1000);
        });
    };
};
