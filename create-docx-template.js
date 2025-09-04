const { Document, Packer, Paragraph, TextRun } = require("docx");
const fs = require('fs');
const path = require('path');

// Create a .docx template with {portfolio} placeholder
const createDocxTemplate = async () => {
  console.log('Creating .docx template with {portfolio} placeholder...');

  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: "Nate Wessels - Resume",
              bold: true,
              size: 36,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "",
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Professional Summary:",
              bold: true,
              size: 28,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Experienced software developer with expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Passionate about creating efficient, scalable solutions and contributing to open-source projects.",
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "",
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Portfolio Link: {portfolio}",
              bold: true,
              size: 26,
              color: "0066CC",
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "",
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Please click the portfolio link above to view my work and track this application.",
              italics: true,
              size: 22,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "",
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Technical Skills:",
              bold: true,
              size: 28,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Frontend: React, Next.js, TypeScript, JavaScript",
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Backend: Node.js, Express, Python, C#",
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Database: MongoDB, PostgreSQL, DynamoDB",
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "• Cloud: AWS, Vercel, Firebase",
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "",
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Contact Information:",
              bold: true,
              size: 28,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Email: your-email@example.com",
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "LinkedIn: linkedin.com/in/your-profile",
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "GitHub: github.com/ngwessels",
              size: 24,
            }),
          ],
        }),
      ],
    }],
  });

  const buffer = await Packer.toBuffer(doc);

  // Save to public directory
  const outputPath = path.join(__dirname, 'public', 'resume-template.docx');
  fs.writeFileSync(outputPath, buffer);

  console.log(`Template created successfully at: ${outputPath}`);
  console.log(`File size: ${buffer.length} bytes`);
  console.log('');
  console.log('The template contains the placeholder {portfolio} which will be replaced with the tracking URL.');
  console.log('You can now edit this .docx file in Microsoft Word to customize the formatting and content.');
};

// Run the function
createDocxTemplate().catch(console.error);
