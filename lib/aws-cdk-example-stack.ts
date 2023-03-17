import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class AwsCdkExampleStack extends cdk.Stack {
  lambdaFunction: lambda.Function;
  lambdaMessagesPostHandler: lambda.Function;
  lambdaMessagesGetAllHandler: lambda.Function;
  lambdaFunctions: lambda.Function[];

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    //  lambda function definition
    this.lambdaFunction = new lambda.Function(this, "lambda-function", {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "index.lambdaHandler",
      code: lambda.Code.fromAsset(path.join(__dirname, "/lambda")),
    });

    this.lambdaMessagesPostHandler = new lambda.Function(
      this,
      "lambda-messages-post-handler",
      {
        runtime: lambda.Runtime.NODEJS_16_X,
        handler: "index.lambdaMessagesPostHandler",
        code: lambda.Code.fromAsset(path.join(__dirname, "/lambda")),
      }
    );

    this.lambdaMessagesGetAllHandler = new lambda.Function(
      this,
      "lambda-messages-get-all-handler",
      {
        runtime: lambda.Runtime.NODEJS_16_X,
        handler: "index.lambdaMessagesGetAllHandler",
        code: lambda.Code.fromAsset(path.join(__dirname, "/lambda")),
      }
    );

    this.lambdaFunctions = [
      this.lambdaFunction,
      this.lambdaMessagesPostHandler,
      this.lambdaMessagesGetAllHandler,
    ];

    // api gateway
    const api = new apigateway.RestApi(this, "Api", {
      restApiName: "MyApi",
    });
    api.root.addMethod(
      "GET",
      new apigateway.LambdaIntegration(this.lambdaFunction)
    );

    const messages = api.root.addResource("messages");
    messages.addMethod(
      "POST",
      new apigateway.LambdaIntegration(this.lambdaMessagesPostHandler)
    );

    messages.addMethod(
      "GET",
      new apigateway.LambdaIntegration(this.lambdaMessagesGetAllHandler)
    );
  }
}
