export function EmailTemplate({ response }) {
  const fileSizeInMB = (response.fileSize / (1024 * 1024)).toFixed(2);

  return `
    <html>
      <head>
        <style>
          /* Add your styles here */
          body {
            background-color: #f6f9fc;
            padding: 20px;
            font-family: Arial, sans-serif;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .heading {
            font-size: 24px;
            font-weight: bold;
            color: #333333;
          }
          .paragraph {
            font-size: 16px;
            color: #333333;
            margin: 10px 0;
          }
          .label {
            font-size: 16px;
            font-weight: bold;
            color: #333333;
          }
          .button {
            display: inline-block;
            background-color: #007bff;
            color: #ffffff; /* Text color set to white */
            padding: 10px 20px;
            border-radius: 4px;
            text-decoration: none;
            font-size: 16px;
            margin-top: 20px;
          }
          .footer {
            font-size: 12px;
            color: #999999;
            text-align: center;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="heading">${response.userName} sent you a file</div>
          </div>
          <div class="section">
            <div class="paragraph">Hello ${response.emailToSend.split("@")[0]},</div>
            <div class="paragraph">You have received a file with the following details:</div>
            <div class="row">
              <div class="column">
                <div class="label">File Name: ${response.fileName}</div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="label">File Size: ${fileSizeInMB} MB</div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="label">File Type: ${response.fileType}</div>
              </div>
            </div>
            <div class="paragraph">*Access and download the file at your own risk.</div>
            <div class="paragraph">You can also share the file with CloudShare Web.</div>
            <div class="row" style="padding: 0;">
              <div class="column" style="max-width: 100%;">
                <a href="${response.shortUrl}" class="button">Click To Download</a>
              </div>
            </div>
            <div class="paragraph">Best regards,</div>
            <div class="paragraph">The CloudShare Team</div>
          </div>
          <div class="footer">
            Copyright ©2024 All rights reserved | CloudShare | viraj-savaliya.web.app
          </div>
        </div>
      </body>
    </html>
  `;
}
