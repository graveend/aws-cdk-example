#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AwsCdkExampleStack } from "../lib/aws-cdk-example-stack";
import { AwsCdkExampleDbStack } from "../lib/aws-cdk-example-db-stack";
import { AwsCdkExampleAsyncStack } from "../lib/aws-cdk-example-async-stack";

const app = new cdk.App();
const env = { account: "521013699958", region: "eu-west-2" };

const awsCdkExampleStack = new AwsCdkExampleStack(app, "AwsCdkExampleStack", {
  env,
});

new AwsCdkExampleDbStack(app, "AwsCdkExampleDbStack", {
  env,
  lambdaFunctions: awsCdkExampleStack.lambdaFunctions,
});

new AwsCdkExampleAsyncStack(app, "AwsCdkExampleAsyncStack", {
  env,
});
