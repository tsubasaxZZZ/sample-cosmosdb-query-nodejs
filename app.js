// @ts-check
//  <ImportConfiguration>
const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./config");
//  </ImportConfiguration>

async function create(client, databaseId, containerId) {
    const partitionKey = config.partitionKey;

    /**
     * Create the database if it does not exist
     */
    const { database } = await client.databases.createIfNotExists({
        id: databaseId
    });
    console.log(`Created database:\n${database.id}\n`);

    /**
     * Create the container if it does not exist
     */
    const { container } = await client
        .database(databaseId)
        .containers.createIfNotExists(
            { id: containerId, partitionKey },
            { offerThroughput: 400 }
        );

    console.log(`Created container:\n${container.id}\n`);
}

async function main() {

    // <CreateClientObjectDatabaseContainer>
    const { endpoint, key, databaseId, containerId } = config;

    const client = new CosmosClient({ endpoint, key });

    const database = client.database(databaseId);
    const container = database.container(containerId);

    // Make sure Tasks database is already setup. If not, create it.
    await create(client, databaseId, containerId);
    // </CreateClientObjectDatabaseContainer>

    try {
        // <QueryItems>
        console.log(`Querying container: Items`);

        // query to return all items
        const querySpec = {
            query: "SELECT * from c"
        };

        // read all items in the Items container
        const { resources: items } = await container.items
            .query(querySpec)
            .fetchAll();

        items.forEach(item => {
            console.log(`${item.id} - ${item.title}`);
        });
        // </QueryItems>


    } catch (err) {
        console.log(err.message);
    }
}

main();