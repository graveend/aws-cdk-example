import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class AwsCdkExampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    //  lambda function definition
    const lambdaFunction = new lambda.Function(this, "lambda-function", {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "index.lambdaHandler",
      code: lambda.Code.fromAsset(path.join(__dirname, "/lambda")),
    });

    // api gateway
    const api = new apigateway.RestApi(this, "Api", {
      restApiName: "MyApi",
    });
    api.root.addMethod("GET", new apigateway.LambdaIntegration(lambdaFunction));
  }
}
