export default function() {
    this.execute = () => {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Hello');
                resolve(true);
            }, 1000);
        });

        return promise;
    };
};
