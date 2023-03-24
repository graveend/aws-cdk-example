// Create the DynamoDB service client module using ES6 syntax.
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DEFAULT_REGION, TABLE_NAME } from "../../../constants";
// Create an Amazon DynamoDB service client object.
export const ddbClient = new DynamoDBClient({ region: DEFAULT_REGION });
// Create a service client module using ES6 syntax.
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false, // false, by default.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: true, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  wrapNumbers: false, // false, by default.
};

// Create the DynamoDB document client.
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, {
  marshallOptions,
  unmarshallOptions,
});

export const getItems = async (): Promise<Record<string, any>[] | undefined> => {
  try {
    const params = {
      TableName: TABLE_NAME,
    };

    const data = await ddbDocClient.send(new ScanCommand(params));
    return data.Items;
  } catch (err) {
    console.log("Error", err);
  }
  return
};

export const putItem = async (message: string) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      Item: {
        id: uuidv4(),
        message,
      },
    };

    const data = await ddbDocClient.send(new PutCommand(params));
    console.log("Success :", data);
  } catch (err) {
    console.log("Error", err);
  }
};
