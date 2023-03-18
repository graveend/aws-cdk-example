import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { MyLambda } from "./constructs/myLambda";

export class AwsCdkExampleStack extends cdk.Stack {
  lambdaFunction: lambda.Function;
  lambdaMessagesPostHandler: lambda.Function;
  lambdaMessagesGetAllHandler: lambda.Function;
  lambdaFunctions: lambda.Function[];

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    //  lambda function definition
    this.lambdaFunction = new MyLambda(this, "lambda-function", {
      handler: "index.lambdaHandler",
    });

    this.lambdaMessagesPostHandler = new MyLambda(
      this,
      "lambda-messages-post-handler",
      {
        handler: "index.lambdaMessagesPostHandler",
      }
    );

    this.lambdaMessagesGetAllHandler = new MyLambda(
      this,
      "lambda-messages-get-all-handler",
      {
        handler: "index.lambdaMessagesGetAllHandler",
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
