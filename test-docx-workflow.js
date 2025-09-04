// Test script for the .docx workflow
const fetch = require('node-fetch');

async function testDocxWorkflow() {
  console.log('Testing .docx workflow...');

  try {
    const response = await fetch('http://localhost:3000/api/job-applications/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companyName: 'Test Company',
        jobApplicationId: '507f1f77bcf86cd799439011' // Valid MongoDB ObjectId
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ API call successful!');
      console.log('Response:', {
        success: data.success,
        pdfGenerated: data.pdfGenerated,
        fileName: data.pdfFileName,
        hasPdfData: !!data.pdfData
      });

      if (data.pdfData) {
        console.log('📄 Generated file size (base64):', data.pdfData.length, 'characters');
        console.log('📄 File name:', data.pdfFileName);
        console.log('🔗 Tracking URL:', data.jobApplication?.trackingUrl);
      }
    } else {
      console.log('❌ API call failed:', data.error);
    }

  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
}

// Only run if this script is called directly
if (require.main === module) {
  testDocxWorkflow();
}

module.exports = { testDocxWorkflow };
