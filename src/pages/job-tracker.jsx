import React, { useState, useEffect } from 'react';
import Head from 'next/head';

const JobTracker = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    jobApplicationId: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedPdfUrl, setProcessedPdfUrl] = useState(null);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [pdfFileName, setPdfFileName] = useState('');

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem('jobTrackerAuth');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');

    // Get password from environment variable
    const correctPassword = process.env.NEXT_PUBLIC_JOB_TRACKER_PASSWORD || 'admin123';

    if (password === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('jobTrackerAuth', 'authenticated');
      setAuthError('');
    } else {
      setAuthError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('jobTrackerAuth');
    setPassword('');
    setAuthError('');
    // Reset all form states
    setFormData({ companyName: '', jobApplicationId: '' });
    setResult(null);
    setError(null);
    setCopiedUrl(false);
    setProcessedPdfUrl(null);
    setPdfGenerated(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/job-applications/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: formData.companyName.trim(),
          jobApplicationId: formData.jobApplicationId.trim() || undefined
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create tracking link');
      }

      setResult(data.jobApplication);

      // Handle automatic .docx generation
      if (data.docxGenerated && data.docxData) {
        console.log('DOCX generated automatically, creating download link...');
        setPdfGenerated(true);

        try {
          // Validate base64 string before decoding
          if (typeof data.docxData !== 'string' || !data.docxData) {
            throw new Error('Invalid DOCX data received - not a string or empty');
          }

          // Store the filename for download
          setPdfFileName(data.docxFileName || `Nate Wessels Resume - ${formData.companyName}.docx`);

          // Clean the base64 string (remove any whitespace or invalid characters)
          const cleanBase64 = data.docxData.replace(/[^A-Za-z0-9+/=]/g, '');

          // Ensure the string length is valid for base64
          if (cleanBase64.length === 0) {
            throw new Error('Base64 string is empty after cleaning');
          }

          if (cleanBase64.length % 4 !== 0) {
            // Pad the string if needed
            const padding = (4 - (cleanBase64.length % 4)) % 4;
            const paddedBase64 = cleanBase64 + '='.repeat(padding);
            console.warn('Base64 string was not properly padded, added padding:', padding);
            cleanBase64 = paddedBase64;
          }

          // Try to decode the base64 string
          let binaryString;
          try {
            binaryString = atob(cleanBase64);
          } catch (decodeError) {
            throw new Error(`Base64 decode failed: ${decodeError.message}`);
          }

          // Convert binary string to Uint8Array
          const docxBlob = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            docxBlob[i] = binaryString.charCodeAt(i);
          }

          const docxUrl = URL.createObjectURL(new Blob([docxBlob], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }));
          setProcessedPdfUrl(docxUrl);
          console.log('DOCX blob created successfully, size:', docxBlob.length, 'bytes');
        } catch (error) {
          console.error('Error creating DOCX blob:', error.message);
          console.error('Raw DOCX data type:', typeof data.docxData);
          console.error('Raw DOCX data length:', data.docxData ? data.docxData.length : 'N/A');
          console.error('Raw DOCX data preview:', data.docxData ? data.docxData.substring(0, 100) + '...' : 'null/undefined');
          setPdfGenerated(false);

          // You could show a user notification here
          alert('There was an issue generating the DOCX. The tracking link was created successfully, but you may need to download your resume separately.');
        }
      } else {
        console.log('DOCX generation failed or was skipped');
        setPdfGenerated(false);
      }

      // Reset form
      setFormData({
        companyName: '',
        jobApplicationId: ''
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (url, type = 'tracking') => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(type);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };



  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Job Application Tracker - Login</title>
          <meta name="description" content="Secure access to job application tracking system" />
        </Head>

        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <h1>🔒 Job Tracker Access</h1>
              <p>Enter your password to access the job application tracking system</p>
            </div>

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    autoFocus
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {authError && (
                <div className="error-message">
                  <p>{authError}</p>
                </div>
              )}

              <button type="submit" className="login-btn">
                🔓 Access Job Tracker
              </button>
            </form>

            <div className="login-footer">
              <p><small>This is a private tool for managing job applications and tracking portfolio views.</small></p>
            </div>
          </div>
        </div>

        <style jsx>{`
          .login-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
          }

          .login-card {
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            padding: 40px;
            width: 100%;
            max-width: 400px;
            text-align: center;
          }

          .login-header h1 {
            color: #2c3e50;
            margin-bottom: 10px;
            font-size: 2rem;
          }

          .login-header p {
            color: #6c757d;
            margin-bottom: 30px;
          }

          .login-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .form-group {
            text-align: left;
          }

          .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #2c3e50;
          }

          .password-input-container {
            position: relative;
            display: flex;
            align-items: center;
          }

          .password-input-container input {
            width: 100%;
            padding: 12px 45px 12px 16px;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
          }

          .password-input-container input:focus {
            outline: none;
            border-color: #64b2b1;
          }

          .toggle-password {
            position: absolute;
            right: 12px;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.2rem;
            color: #6c757d;
            padding: 4px;
            border-radius: 4px;
            transition: color 0.2s ease;
          }

          .toggle-password:hover {
            color: #64b2b1;
          }

          .error-message {
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
            padding: 10px;
            border-radius: 6px;
            text-align: center;
          }

          .login-btn {
            background: linear-gradient(135deg, #64b2b1 0%, #27999d 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 30px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 10px;
          }

          .login-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(100, 178, 177, 0.3);
          }

          .login-footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
          }

          .login-footer p {
            color: #6c757d;
            margin: 0;
          }

          @media (max-width: 480px) {
            .login-container {
              padding: 15px;
            }

            .login-card {
              padding: 30px 20px;
            }

            .login-header h1 {
              font-size: 1.8rem;
            }
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Job Application Tracker - Nate Wessels Portfolio</title>
        <meta name="description" content="Create tracking links for job applications to monitor when employers view your portfolio" />
      </Head>

      <div className="job-tracker-container">
        <div className="job-tracker-header">
          <div className="header-content">
            <div>
              <h1>Job Application Tracker</h1>
              <p>Create unique tracking links for your job applications to know when employers view your portfolio.</p>
            </div>
            <button onClick={handleLogout} className="logout-btn" title="Logout">
              🚪 Logout
            </button>
          </div>
        </div>

        <div className="job-tracker-content">
          <div className="form-section">
            <h2>Create New Tracking Link</h2>
            <form onSubmit={handleSubmit} className="tracking-form">
              <div className="form-group">
                <label htmlFor="companyName">
                  Company Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="e.g., Google, Microsoft, Amazon"
                  required
                  minLength="2"
                  maxLength="100"
                />
              </div>

              <div className="form-group">
                <label htmlFor="jobApplicationId">
                  Job Application ID <span className="optional">(optional)</span>
                </label>
                <input
                  type="text"
                  id="jobApplicationId"
                  name="jobApplicationId"
                  value={formData.jobApplicationId}
                  onChange={handleInputChange}
                  placeholder="e.g., JOB-12345, REQ-ABC123"
                  maxLength="100"
                />
                <small className="help-text">Reference ID from the job posting or application system</small>
              </div>

              <button
                type="submit"
                disabled={isLoading || !formData.companyName.trim()}
                className="create-link-btn"
              >
                {isLoading ? 'Creating...' : 'Create Tracking Link'}
              </button>
            </form>
          </div>

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          {result && (
            <div className="success-section">
              <h2>Tracking Link Created Successfully!</h2>
              <div className="result-card">
                <div className="result-info">
                  <h3>{result.companyName}</h3>
                  {result.jobApplicationId && (
                    <p className="job-id">Job ID: {result.jobApplicationId}</p>
                  )}
                  <p className="created-date">
                    Created: {new Date(result.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="tracking-url-section">
                  <label>Your Tracking URL:</label>
                  <div className="url-container">
                    <input
                      type="text"
                      value={result.trackingUrl}
                      readOnly
                      className="tracking-url-input"
                    />
                    <button
                      onClick={() => copyToClipboard(result.trackingUrl)}
                      className="copy-btn"
                      title="Copy to clipboard"
                    >
                      {copiedUrl ? '✓' : '📋'}
                    </button>
                  </div>
                  <p className="url-instructions">
                    Use this URL in your resume, cover letter, or job application instead of your regular portfolio URL.
                    Your resume DOCX with the tracking URL will be generated automatically and available for download below.
                    You'll receive an email notification whenever this link is accessed.
                  </p>
                </div>

                {/* DOCX Status Section */}
                {pdfGenerated ? (
                  <div className="pdf-status-section">
                    <div className="pdf-status success">
                      <span className="status-icon">✅</span>
                      <div className="status-content">
                        <h4>Resume DOCX Generated Successfully!</h4>
                        <p>Your resume has been automatically processed with the tracking URL.</p>
                        <button
                          onClick={() => {
                            if (processedPdfUrl) {
                              const link = document.createElement('a');
                              link.href = processedPdfUrl;
                              link.download = pdfFileName || `Nate Wessels Resume - ${formData.companyName}.docx`;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }
                          }}
                          className="download-ready-btn"
                        >
                          📥 Download Processed Resume (DOCX)
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="pdf-status-section">
                    <div className="pdf-status info">
                      <span className="status-icon">📄</span>
                      <div className="status-content">
                        <h4>Resume Processing</h4>
                        <p>Your resume DOCX will be generated automatically after creating the tracking URL.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* GitHub and LinkedIn Copy Section */}
                <div className="social-links-section">
                  <h3>Quick Copy Links</h3>
                  <div className="social-links-grid">
                    <div className="social-link-item">
                      <label>GitHub Profile:</label>
                      <div className="url-container">
                        <input
                          type="text"
                          value="https://github.com/ngwessels"
                          readOnly
                          className="social-url-input"
                        />
                        <button
                          onClick={() => copyToClipboard("https://github.com/ngwessels")}
                          className="copy-btn"
                          title="Copy GitHub URL"
                        >
                          {copiedUrl === "github" ? '✓' : '📋'}
                        </button>
                      </div>
                    </div>

                    <div className="social-link-item">
                      <label>LinkedIn Profile:</label>
                      <div className="url-container">
                        <input
                          type="text"
                          value="https://www.linkedin.com/in/nathanael-wessels/"
                          readOnly
                          className="social-url-input"
                        />
                        <button
                          onClick={() => copyToClipboard("https://www.linkedin.com/in/nathanael-wessels/", "linkedin")}
                          className="copy-btn"
                          title="Copy LinkedIn URL"
                        >
                          {copiedUrl === "linkedin" ? '✓' : '📋'}
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="social-instructions">
                    Easily copy your GitHub and LinkedIn profile links to include in job applications.
                  </p>
                </div>


              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .job-tracker-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }

        .job-tracker-header {
          margin-bottom: 40px;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
        }

        .header-content > div:first-child {
          flex: 1;
          text-align: center;
        }

        .job-tracker-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 15px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .job-tracker-header p {
          font-size: 1.1rem;
          color: #6c757d;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .logout-btn {
          background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .logout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(220, 53, 69, 0.3);
        }

        /* Mobile header layout */
        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            text-align: center;
            gap: 15px;
          }

          .logout-btn {
            align-self: center;
          }
        }

        .job-tracker-content {
          background: white;
          border-radius: 15px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .form-section h2 {
          font-size: 1.8rem;
          color: #2c3e50;
          margin-bottom: 30px;
          text-align: center;
        }

        .tracking-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-weight: 600;
          color: #2c3e50;
          font-size: 1rem;
        }

        .required {
          color: #dc3545;
        }

        .optional {
          color: #6c757d;
          font-weight: 400;
        }

        .form-group input {
          padding: 12px 16px;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
          background: #f8f9fa;
        }

        .form-group input:focus {
          outline: none;
          border-color: #64b2b1;
          background: white;
        }

        .form-group input:invalid:not(:placeholder-shown) {
          border-color: #dc3545;
        }

        .help-text {
          color: #6c757d;
          font-size: 0.9rem;
          font-style: italic;
        }

        .create-link-btn {
          background: linear-gradient(135deg, #64b2b1 0%, #27999d 100%);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          align-self: center;
          min-width: 200px;
          margin-top: 10px;
        }

        .create-link-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(100, 178, 177, 0.3);
        }

        .create-link-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .error-message {
          background: #f8d7da;
          border: 1px solid #f5c6cb;
          color: #721c24;
          padding: 15px;
          border-radius: 8px;
          margin-top: 20px;
        }

        .success-section {
          margin-top: 40px;
          padding-top: 30px;
          border-top: 2px solid #e9ecef;
        }

        .success-section h2 {
          color: #28a745;
          font-size: 1.5rem;
          margin-bottom: 20px;
          text-align: center;
        }

        .result-card {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 12px;
          padding: 25px;
          border: 1px solid rgba(100, 178, 177, 0.2);
        }

        .result-info h3 {
          color: #2c3e50;
          font-size: 1.4rem;
          margin-bottom: 5px;
        }

        .job-id {
          color: #64b2b1;
          font-weight: 500;
          margin-bottom: 10px;
        }

        .created-date {
          color: #6c757d;
          font-size: 0.9rem;
          margin-bottom: 20px;
        }

        .tracking-url-section {
          margin-top: 20px;
        }

        .tracking-url-section label {
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 10px;
          display: block;
        }

        .url-container {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 15px;
        }

        .tracking-url-input {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid #64b2b1;
          border-radius: 8px;
          font-size: 1rem;
          background: white;
          font-family: monospace;
        }

        .copy-btn {
          background: #64b2b1;
          color: white;
          border: none;
          padding: 12px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s ease;
          min-width: 50px;
        }

        .copy-btn:hover {
          background: #27999d;
        }

        .url-instructions {
          color: #6c757d;
          font-size: 0.95rem;
          line-height: 1.5;
          background: rgba(100, 178, 177, 0.1);
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #64b2b1;
        }

        @media (max-width: 768px) {
          .job-tracker-container {
            padding: 20px 15px;
          }

          .job-tracker-header h1 {
            font-size: 2rem;
          }

          .job-tracker-content {
            padding: 25px 20px;
          }

          .url-container {
            flex-direction: column;
            gap: 10px;
          }

          .tracking-url-input {
            font-size: 0.9rem;
          }
        }

        /* PDF Status Section Styles */
        .pdf-status-section {
          margin-top: 25px;
          margin-bottom: 25px;
        }

        .pdf-status {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid;
        }

        .pdf-status.success {
          background: rgba(40, 167, 69, 0.1);
          border-color: rgba(40, 167, 69, 0.3);
        }

        .pdf-status.info {
          background: rgba(100, 178, 177, 0.05);
          border-color: rgba(100, 178, 177, 0.2);
        }

        .pdf-status .status-icon {
          font-size: 24px;
          flex-shrink: 0;
        }

        .status-content {
          flex: 1;
        }

        .status-content h4 {
          margin: 0 0 8px 0;
          color: #2c3e50;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .status-content p {
          margin: 0 0 15px 0;
          color: #6c757d;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .download-ready-btn {
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 25px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .download-ready-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(40, 167, 69, 0.3);
        }

        /* Mobile Styles for PDF Status */
        @media (max-width: 768px) {
          .pdf-status {
            padding: 15px;
            flex-direction: column;
            text-align: center;
          }

          .pdf-status .status-icon {
            align-self: center;
            margin-bottom: 10px;
          }

          .download-ready-btn {
            width: 100%;
            max-width: 250px;
            margin: 0 auto;
          }
        }

        /* Social Links Section Styles */
        .social-links-section {
          margin-top: 30px;
          padding-top: 25px;
          border-top: 2px solid rgba(100, 178, 177, 0.2);
        }

        .social-links-section h3 {
          color: #64b2b1;
          font-size: 1.3rem;
          margin-bottom: 20px;
          text-align: center;
          font-weight: 600;
        }

        .social-links-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-bottom: 15px;
        }

        .social-link-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .social-link-item label {
          font-weight: 600;
          color: #2c3e50;
          font-size: 0.95rem;
        }

        .social-url-input {
          flex: 1;
          padding: 10px 14px;
          border: 2px solid rgba(100, 178, 177, 0.3);
          border-radius: 6px;
          font-size: 0.9rem;
          background: #f8f9fa;
          font-family: monospace;
          color: #495057;
        }

        .social-url-input:focus {
          outline: none;
          border-color: #64b2b1;
          background: white;
        }

        .social-instructions {
          color: #6c757d;
          font-size: 0.9rem;
          text-align: center;
          margin: 0;
          font-style: italic;
        }

        /* Tablet and Mobile Styles for Social Links */
        @media (max-width: 768px) {
          .social-links-grid {
            gap: 15px;
          }

          .social-links-section h3 {
            font-size: 1.2rem;
          }

          .social-url-input {
            font-size: 0.85rem;
            padding: 8px 12px;
          }
        }

        @media (max-width: 480px) {
          .social-links-section {
            margin-top: 25px;
            padding-top: 20px;
          }

          .social-links-section h3 {
            font-size: 1.1rem;
            margin-bottom: 15px;
          }
        }


      `}</style>
    </>
  );
};

export default JobTracker;
