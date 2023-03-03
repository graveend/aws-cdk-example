import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

// https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html
export const lambdaHandler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'hello world',
        }),
    };
};
