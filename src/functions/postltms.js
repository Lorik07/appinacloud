const { app, output } = require('@azure/functions');
 
const cosmosOutput = output.cosmosDB({
    databaseName: 'cosmosdb-010',
    containerName: 'Items',
    connection: 'CosmosDB',
 
});
 
app.http('createItem', {
    methods: ['POST'],
    authLevel: 'anonymous',
    extraOutputs: [cosmosOutput],
    route: 'items/post',
    handler: async (request, context) => {
        const newItem = await request.json();
       
        context.extraOutputs.set(cosmosOutput, newItem);
       
       
    }
});
 
