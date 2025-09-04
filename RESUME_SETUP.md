# Resume Processing Setup

## 📄 Setting Up Your Resume for Processing

To use the automated resume processing feature, you need to upload your resume file to the correct location.

### Step 1: Prepare Your Resume
1. Make sure your resume is in `.docx` format
2. Include your portfolio URL (`https://natewessels.dev`) in your resume
3. Save the file as `resume.docx`

### Step 2: Upload to Public Directory
1. Navigate to your project directory
2. Create or ensure the `public` folder exists
3. Place your `resume.docx` file in the `public` folder:
   ```
   /Users/ngwessels/Desktop/nextjs-portfolio/public/resume.docx
   ```

### Step 3: Verify Setup
1. Go to `https://natewessels.dev/job-tracker`
2. Create a tracking URL
3. The resume processing section should show:
   - ✅ "Resume File: public/resume.docx"
   - ✅ "Using pre-uploaded resume file"

### Step 4: Process Your Resume
1. Create a tracking URL (e.g., `https://natewessels.dev?id=aB3dE5fG`)
2. Click "Process & Convert to PDF"
3. Download your processed resume with the tracking URL

## 🔧 File Requirements

- **Format**: `.docx` (Microsoft Word document)
- **Location**: `public/resume.docx`
- **Content**: Must contain `https://natewessels.dev` URL
- **Size**: Under 10MB (recommended)

## 📝 How It Works

1. The system reads your pre-uploaded `resume.docx` file
2. Extracts text content and finds portfolio URLs
3. Replaces `https://natewessels.dev` with tracking URL
4. Generates a PDF with the processed content
5. Provides download link for the updated resume

## 🆘 Troubleshooting

**"Resume file not found" error:**
- Ensure `resume.docx` exists in the `public` folder
- Check file permissions
- Verify the file is not corrupted

**"No URL replacements made" message:**
- Check that your resume contains `https://natewessels.dev`
- Ensure the URL is in plain text (not as an image or hyperlink)
- Try different variations of the URL if needed

**Processing takes too long:**
- Ensure your `.docx` file is not too large
- Check that the file is not password-protected
- Try with a simpler document first

## 🎯 Example Usage

1. Upload `resume.docx` to `public/` folder
2. Visit `/job-tracker`
3. Fill out company details
4. Generate tracking URL
5. Click "Process & Convert to PDF"
6. Download the processed resume
7. Use the downloaded PDF for job applications

The processed resume will automatically contain your tracking URL instead of the regular portfolio URL!
