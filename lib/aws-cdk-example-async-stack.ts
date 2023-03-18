import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Bucket, EventType } from "aws-cdk-lib/aws-s3";
import { Topic } from "aws-cdk-lib/aws-sns";
import { Queue } from "aws-cdk-lib/aws-sqs";
import { SnsDestination } from "aws-cdk-lib/aws-s3-notifications";
import {
  EmailSubscription,
  SqsSubscription,
} from "aws-cdk-lib/aws-sns-subscriptions";

export class AwsCdkExampleAsyncStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // S3 Bucket
    const bucket = new Bucket(this, "Bucket", {
      bucketName: "aws-cdk-example-s3-bucket-geethu",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // SNS
    const topic = new Topic(this, "Topic", {});
    topic.addSubscription(
      new EmailSubscription("geethu.raveendran2110@gmail.com")
    );
    bucket.addEventNotification(
      EventType.OBJECT_CREATED_PUT,
      new SnsDestination(topic)
    );

    // SQS
    const queue = new Queue(this, "Queue", {});
    topic.addSubscription(new SqsSubscription(queue));
  }
}
