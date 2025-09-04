import { jobApplicationsDb } from "../../../lib/mongodb";
import fs from 'fs';
import path from 'path';
// For .docx manipulation
const { Document, Packer, Paragraph, TextRun } = require("docx");
const mammoth = require("mammoth");
const JSZip = require("jszip");


// Function to read .docx template and replace placeholders while preserving ALL styling
const processDocxTemplate = async (trackingUrl, companyName) => {
  try {
    console.log('Processing existing Resume.docx for:', companyName);

    // Path to your existing resume file
    const templatePath = path.join(process.cwd(), 'public', 'Resume.docx');

    // Check if Resume.docx exists
    if (!fs.existsSync(templatePath)) {
      console.log('Resume.docx not found in public directory');
      return null;
    }

    console.log('Reading original Resume.docx...');
    const templateBuffer = fs.readFileSync(templatePath);
    console.log('Original file size:', templateBuffer.length, 'bytes');

    // Load the .docx file as a zip archive to preserve all formatting
    const zip = await JSZip.loadAsync(templateBuffer);

    // Get all files in the .docx (for debugging)
    const files = Object.keys(zip.files);
    console.log('Files in .docx:', files.filter(f => !f.startsWith('.')));

    // Read the document.xml.rels file to replace the dummy URL
    const relsPath = 'word/_rels/document.xml.rels';
    let documentRelsXml = '';

    if (zip.file(relsPath)) {
      documentRelsXml = await zip.file(relsPath).async('string');
      console.log('Found document.xml.rels file');
      console.log('document.xml.rels content:', documentRelsXml);

      // Try multiple patterns for the dummy URL
      const patterns = [
        /https:\/\/example\.com/g,
        /https%3A%2F%2Fexample\.com/g,  // URL encoded
        /example\.com/g,
        /https:\/\/example\.com/gi,    // case insensitive
      ];

      let replacementMade = false;
      let originalRelsXml = documentRelsXml;

      for (const pattern of patterns) {
        documentRelsXml = documentRelsXml.replace(pattern, trackingUrl);
        if (documentRelsXml !== originalRelsXml) {
          console.log(`Successfully replaced using pattern: ${pattern}`);
          replacementMade = true;
          break;
        }
      }

      if (replacementMade) {
        console.log('Successfully replaced dummy URL with tracking URL in relationships file');
        zip.file(relsPath, documentRelsXml);
      } else {
        console.log('Warning: Dummy URL not found with any pattern. Looking for URLs in .rels file...');

        // Log all URLs found in the file
        const urlMatches = documentRelsXml.match(/https?:\/\/[^\s"']+/g);
        if (urlMatches) {
          console.log('URLs found in document.xml.rels:', urlMatches);
        } else {
          console.log('No URLs found in document.xml.rels');
        }
      }
    } else {
      console.log('Warning: document.xml.rels file not found - no hyperlinks to update');

      // Check if there are any .rels files
      const relsFiles = files.filter(f => f.includes('.rels'));
      console.log('Available .rels files:', relsFiles);

      // Check all .rels files for hyperlinks
      for (const relsFile of relsFiles) {
        try {
          const relsContent = await zip.file(relsFile).async('string');
          console.log(`Checking ${relsFile} for hyperlinks...`);
          const urlMatches = relsContent.match(/https?:\/\/[^\s"']+/g);
          if (urlMatches) {
            console.log(`URLs found in ${relsFile}:`, urlMatches);
          }
        } catch (error) {
          console.log(`Error reading ${relsFile}:`, error.message);
        }
      }
    }

    // Check document.xml for hyperlinks
    let documentXml = await zip.file('word/document.xml').async('string');
    console.log('Checking document.xml for hyperlinks...');

    // Look for various hyperlink patterns
    const hyperlinkPatterns = [
      /<w:hyperlink[^>]*>[\s\S]*?<\/w:hyperlink>/g,  // Standard hyperlinks
      /r:id="[^"]*"/g,  // Relationship IDs
      /https?:\/\/[^\s<>"']+/g,  // Direct URLs in text
      /example\.com/g,  // Domain mentions
      /hyperlink/gi,  // Any mention of hyperlink
    ];

    console.log('Searching for hyperlinks with multiple patterns...');

    for (const pattern of hyperlinkPatterns) {
      const matches = documentXml.match(pattern);
      if (matches) {
        console.log(`Pattern ${pattern} found ${matches.length} matches:`, matches.slice(0, 5)); // Show first 5 matches
      } else {
        console.log(`Pattern ${pattern} found no matches`);
      }
    }

    // Also check for any text content that might contain URLs
    const textContent = documentXml.match(/<w:t[^>]*>([^<]*)<\/w:t>/g);
    if (textContent) {
      console.log('Text content in document (first 10):');
      textContent.slice(0, 10).forEach((text, index) => {
        if (text.includes('http') || text.includes('example') || text.includes('portfolio')) {
          console.log(`Text ${index + 1}: ${text}`);
        }
      });
    }

    // Also check if there's a {portfolio} placeholder to replace as fallback
    console.log('Original document.xml (first 500 chars):', documentXml.substring(0, 500) + '...');

    const originalXml = documentXml;
    documentXml = documentXml.replace(/\{portfolio\}/g, trackingUrl);

    if (documentXml !== originalXml) {
      console.log('Also replaced {portfolio} placeholder with tracking URL as fallback');
      zip.file('word/document.xml', documentXml);
    } else {
      // Try to find and replace the dummy URL directly in document.xml
      const dummyUrlPattern = /https:\/\/example\.com/g;
      documentXml = documentXml.replace(dummyUrlPattern, trackingUrl);

      if (documentXml !== originalXml) {
        console.log('Replaced dummy URL directly in document.xml');
        zip.file('word/document.xml', documentXml);
      } else {
        console.log('No dummy URLs or placeholders found to replace');
      }
    }

    // Generate the modified .docx buffer
    const modifiedBuffer = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE'
    });

    console.log('Generated modified .docx with preserved formatting, size:', modifiedBuffer.length, 'bytes');

    return modifiedBuffer;

  } catch (error) {
    console.error('Error processing Resume.docx:', error);
    console.error('Error details:', error.message);
    // Fallback to creating basic template
    return await createBasicDocxTemplate(trackingUrl, companyName);
  }
};

// Create a basic .docx template if none exists
const createBasicDocxTemplate = async (trackingUrl, companyName) => {
  console.log('Creating basic .docx template with tracking URL');

  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: `Resume for ${companyName}`,
              bold: true,
              size: 32,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `Portfolio Link: ${trackingUrl}`,
              size: 24,
              color: "0066CC",
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Please click the link above to view my portfolio and track this application.',
              size: 24,
            }),
          ],
        }),
      ],
    }],
  });

  const buffer = await Packer.toBuffer(doc);
  return buffer;
};

// Main resume processing function - now returns .docx directly
const processResumeToPDF = async (trackingUrl, originalUrl, companyName) => {
  try {
    console.log('Processing .docx template for:', companyName);

    // Process the .docx template with tracking URL
    const docxBuffer = await processDocxTemplate(trackingUrl, companyName);

    if (!docxBuffer) {
      console.log('Failed to process .docx template');
      return null;
    }

    console.log('Successfully processed .docx template, returning .docx file');
    return docxBuffer;

  } catch (error) {
    console.error('Error processing .docx template:', error);
    return null;
  }
};

// Validation functions
const validateCompanyName = (companyName) => {
  if (!companyName || typeof companyName !== 'string') {
    return { isValid: false, error: 'Company name is required' };
  }

  if (companyName.trim().length < 2) {
    return { isValid: false, error: 'Company name must be at least 2 characters long' };
  }

  if (companyName.length > 100) {
    return { isValid: false, error: 'Company name must be less than 100 characters' };
  }

  return { isValid: true, value: companyName.trim() };
};

const validateJobApplicationId = (jobApplicationId) => {
  // Job application ID is now optional
  if (!jobApplicationId) {
    return { isValid: true, value: null };
  }

  if (typeof jobApplicationId !== 'string') {
    return { isValid: false, error: 'Job application ID must be a string' };
  }

  // Trim whitespace and check length
  const trimmedId = jobApplicationId.trim();

  if (trimmedId.length === 0) {
    return { isValid: true, value: null }; // Empty after trimming = treat as optional
  }

  if (trimmedId.length < 2) {
    return { isValid: false, error: 'Job application ID must be at least 2 characters long' };
  }

  if (trimmedId.length > 100) {
    return { isValid: false, error: 'Job application ID must be less than 100 characters' };
  }

  // Allow flexible format - alphanumeric, hyphens, underscores, dots
  const flexibleRegex = /^[a-zA-Z0-9\-_\.]+$/;
  if (!flexibleRegex.test(trimmedId)) {
    return { isValid: false, error: 'Job application ID can only contain letters, numbers, hyphens, underscores, and dots' };
  }

  return { isValid: true, value: trimmedId };
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { companyName, jobApplicationId } = req.body;

    // Validate inputs
    const companyNameValidation = validateCompanyName(companyName);
    if (!companyNameValidation.isValid) {
      return res.status(400).json({ error: companyNameValidation.error });
    }

    const jobApplicationIdValidation = validateJobApplicationId(jobApplicationId);
    if (!jobApplicationIdValidation.isValid) {
      return res.status(400).json({ error: jobApplicationIdValidation.error });
    }

    console.log(`Creating tracking link for: ${companyNameValidation.value}`);

    // Try to process the resume PDF first to get initial data
    const start = Date.now();

    // Create the tracking URL base with fixed domain
    const baseUrl = 'https://natewessels.dev';

    // Create job application record using the proper method
    const createResult = await jobApplicationsDb.createJobApplication(
      companyNameValidation.value,
      jobApplicationIdValidation.value
    );

    if (!createResult.success) {
      console.error('Failed to create job application:', createResult.error);
      return res.status(500).json({
        error: 'Failed to create job application record'
      });
    }

    // Now we have the actual shortId, create the tracking URL
    const trackingUrl = `${baseUrl}/?id=${createResult.jobApplication.shortId}`;

    // Process the resume with the correct tracking URL
    const docxBytes = await processResumeToPDF(trackingUrl, `${baseUrl}`, companyNameValidation.value);

    console.log('Job application created successfully in', Date.now() - start, 'ms');

    // Prepare response data
    const responseData = {
      success: true,
      jobApplication: {
        id: createResult.jobApplication._id,
        shortId: createResult.jobApplication.shortId,
        companyName: companyNameValidation.value,
        trackingUrl,
        createdAt: createResult.jobApplication.createdAt
      }
    };

    // Include .docx data if it was generated successfully
    if (docxBytes) {
      responseData.docxGenerated = true;
      responseData.docxData = docxBytes.toString('base64');
      responseData.docxFileName = `Nate Wessels Resume - ${companyNameValidation.value}.docx`;
      console.log('Generated .docx with tracking URL included in response');
      console.log('DOCX data length:', docxBytes.toString('base64').length);
      console.log('DOCX data starts with:', docxBytes.toString('base64').substring(0, 50));
    } else {
      responseData.docxGenerated = false;
      console.log('DOCX generation skipped or failed');
    }

    console.log(`Complete response generated in ${Date.now() - start}ms`);

    return res.status(200).json(responseData);

  } catch (error) {
    console.error('Error creating job application:', error);
    console.error('Error details:', error.message);

    // Check if it's a MongoDB connection error
    if (error.message && error.message.includes('ECONNREFUSED')) {
      return res.status(500).json({
        error: 'Database connection failed. Please try again later.'
      });
    }

    return res.status(500).json({
      error: 'Internal server error. Please try again later.'
    });
  }
}