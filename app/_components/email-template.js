import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";



export const EmailTemplate = ({ responce }) => (
  <Html>
    <Head />
    <Preview>You&apos;ve received a file from a user</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={heading}>
            {responce?.userName + " sent you a file,"}
          </Heading>
        </Section>
        <Section>
          <Text style={paragraph}>
            Hello {responce?.emailToSend?.split("@")[0]},
          </Text>
          <Text style={paragraph}>
            You have received a file with the following details:
          </Text>
          <Row>
            <Column>
              <Text style={label}>File Name: {responce?.fileName}</Text>
            </Column>
          </Row>
          <Row>
            <Column>
              <Text style={label}>
                File Size: {(responce?.fileSize / (1024 * 1024)).toFixed(2)} MB
              </Text>
            </Column>
          </Row>
          <Row>
            <Column>
              <Text style={label}>File Type: {responce?.fileType}</Text>
            </Column>
          </Row>
          <Text style={paragraph}>
            *Access and download the file at your own risk.
          </Text>
          <Text style={paragraph}>
            You can also share the file with CloudShare Web.
          </Text>
          <Row style={{ padding: "0" }}>
            <Column style={container} colSpan={2}>
              <a href={responce?.shortUrl} style={button}>Click To Download</a>
            </Column>
          </Row>
          <Text style={paragraph}>Best regards,</Text>
          <Text style={paragraph}>The CloudShare Team</Text>
        </Section>
        <Text style={footer}>
          Copyright &copy; 2024 All rights reserved | CloudShare | vmsmywebsite.web.app
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#f6f9fc",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
};

const container = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const header = {
  borderBottom: "1px solid #e6ecf1",
  paddingBottom: "10px",
  marginBottom: "20px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#333333",
};

const paragraph = {
  fontSize: "16px",
  color: "#333333",
  margin: "10px 0",
};

const label = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#333333",
};

const button = {
  display: "inline-block",
  backgroundColor: "#007bff",
  color: "#ffffff",
  padding: "10px 20px",
  borderRadius: "4px",
  textDecoration: "none",
  fontSize: "16px",
  marginTop: "20px",
};

const footer = {
  fontSize: "12px",
  color: "#999999",
  textAlign: "center",
  marginTop: "20px",
};
