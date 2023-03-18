import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import * as path from "path";
import * as cdk from "aws-cdk-lib";

export interface MyLambdaProps {
  handler: string;
}

export class MyLambda extends lambda.Function {
  constructor(scope: Construct, id: string, props: MyLambdaProps) {
    super(scope, id, {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset(path.join(__dirname, "/lambda")),
      ...props,
    });

    this.logGroup.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);
  }
}
