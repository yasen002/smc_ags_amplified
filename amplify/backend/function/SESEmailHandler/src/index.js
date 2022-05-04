const aws = require("aws-sdk");
const ses = new aws.SES();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === "INSERT") {
      //pull off items from stream
      const candidateName = streamedItem.dynamodb.NewImage.officialName.S;
      const candidateEmail = streamedItem.dynamodb.NewImage.email.S;

      await ses
        .sendEmail({
          Destination: {
            ToAddresses: candidateEmail,
          },
          Source: process.env.NEXT_PUBLIC_SES_EMAIL,
          Message: {
            Subject: { Data: "Candidate Submission" },
            Body: {
              Text: { Data: `My name is ${candidateName}. You can reach me at ${candidateEmail}` },
            },
          },
        })
        .promise();
    }
  }
  return { status: "done" };
};
