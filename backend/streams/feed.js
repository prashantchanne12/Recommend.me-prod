

async function main() {

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        const pipeline = [
            {
                '$match': {
                    'operationType': 'update',
                },
            }
        ];

        await monitorListingsUsingEventEmitter(client, 30000, pipeline);
        // await monitorListingsUsingHasNext(client, 30000, pipeline);
        // await monitorListingsUsingStreamAPI(client, 30000, pipeline);

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

async function monitorListingsUsingEventEmitter(client, timeInMs = 60000, pipeline = []) {

    const userCollection = client.db("recommendme").collection("users");

    const changeStream = userCollection.watch(pipeline);

    changeStream.on('change', async (next) => {

        console.log(next);
        //    { $push: { scores: { $each: [ 90, 92, 85 ] } } }

        // await userCollection.updateMany({}, { $push: { listings: next.fullDocument } } );

    });
}