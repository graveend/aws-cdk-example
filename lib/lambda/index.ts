import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { putItem, getItems } from "./clients/db";

// https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html
export const lambdaHandler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Context: ${JSON.stringify(context, null, 2)}`);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "hello world",
    }),
  };
};

export const lambdaMessagesPostHandler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body as string);
  const message = body.message;
  await putItem(message);
  return {
    statusCode: 200,
    body: "",
  };
};

export const lambdaMessagesGetAllHandler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const data = await getItems();
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
