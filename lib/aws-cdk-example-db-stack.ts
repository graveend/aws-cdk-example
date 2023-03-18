import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { TABLE_NAME, TABLE_PRIMARY_KEY } from "../constants";

interface AwsCdkExampleDbStackProps extends cdk.StackProps {
  lambdaFunctions: lambda.Function[];
}

export class AwsCdkExampleDbStack extends cdk.Stack {
  table: dynamodb.Table

  constructor(scope: Construct, id: string, props: AwsCdkExampleDbStackProps) {
    super(scope, id, props);
    const table = new dynamodb.Table(this, TABLE_NAME, {
      tableName: TABLE_NAME,
      partitionKey: { name: TABLE_PRIMARY_KEY, type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });
    props.lambdaFunctions.forEach(lambdaFunction => table.grantFullAccess(lambdaFunction));
  }
}
