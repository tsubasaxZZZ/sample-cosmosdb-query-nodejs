// @ts-check
const config = {
    endpoint: "https://<Cosmos DB アカウント>.documents.azure.com:443/",
    key: "<キー>",
    databaseId: "<データベースID>",
    containerId: "<コンテナID>",
    partitionKey: { kind: "Hash", paths: ["/<パーティションキー>"] }
};

module.exports = config;