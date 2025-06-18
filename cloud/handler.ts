import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const sqsClient = new SQSClient({ region: "us-east-1" });

const QUEUE_URL = process.env.QUEUE_URL || "";

type CompanyDTO = {
  companyName: string;
  cuit: string;
  companyType: "sme" | "corporate";
};

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return badRequest("Missing body");
    }

    const data: CompanyDTO = JSON.parse(event.body);

    if (!data.companyName || !data.cuit || !data.companyType) {
      return badRequest("Missing required fields");
    }

    if (!validateCuit(data.cuit)) {
      return badRequest("Invalid CUIT format");
    }

    if (!validateCompanyType(data.companyType)) {
      return badRequest("Invalid companyType");
    }

    await saveCompany(data);

    console.log("Company saved:", data);

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Company created successfully", data }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};

function validateCuit(cuit: string): boolean {
  if (cuit.length !== 13 || !/^\d{2}-\d{8}-\d$/.test(cuit)) {
    return false;
  }

  const base = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

  cuit = cuit.replace(/-/g, "");

  let aux = 0;
  for (let i = 0; i < 10; i++) {
    aux += parseInt(cuit[i], 10) * base[i];
  }

  aux = 11 - (aux - Math.floor(aux / 11) * 11);

  if (aux === 11) {
    aux = 0;
  }
  if (aux === 10) {
    aux = 9;
  }

  return aux === parseInt(cuit[10], 10);
}

function validateCompanyType(companyType: string): boolean {
  return ["sme", "corporate"].includes(companyType);
}

async function saveCompany(company: CompanyDTO) {
  const command = new SendMessageCommand({
    QueueUrl: QUEUE_URL,
    MessageBody: JSON.stringify(company),
  });

  return sqsClient.send(command);
}

function badRequest(message: string): APIGatewayProxyResult {
  return {
    statusCode: 400,
    body: JSON.stringify({ message }),
  };
}
